import crypto from "crypto";
import { Pool, PoolClient, QueryResultRow } from "pg";

export type GiftPaymentStatus =
  | "pending"
  | "in_process"
  | "approved"
  | "paid"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "canceled"
  | "expired";

type GiftPaymentInput = {
  memoryId: number;
  guestId: string;
  guestGroupId: string;
  guestName: string;
  guestEmail: string;
  amount: number;
  externalReference: string;
};

type ApprovedPaymentInput = {
  externalReference: string;
  mercadoPagoPaymentId: string;
  amount: number;
};

export type GiftAdminRow = {
  unlock_id: string;
  memory_id: number;
  public_guest_name: string;
  unlocked_at: Date;
  payment_guest_name: string;
  guest_email: string;
  guest_id: string | null;
  guest_group_id: string | null;
  amount: string;
  status: GiftPaymentStatus;
  approved_at: Date | null;
  payment_created_at: Date;
};

let pool: Pool | null = null;

const giftGroupLimit = 2;
const validLimitStatuses = [
  "paid",
  "approved",
  "confirmed",
];

export class GiftGroupLimitError extends Error {
  constructor() {
    super(
      "Esse grupo familiar já desbloqueou o limite de memórias disponíveis. Nossa ideia é que todos possam participar dessa história com carinho. ❤️"
    );
    this.name = "GiftGroupLimitError";
  }
}

function getPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl:
        connectionString.includes("sslmode=disable") ||
        connectionString.includes("localhost")
          ? undefined
          : { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
) {
  return getPool().query<T>(text, params);
}

export async function ensureGiftPaymentSchema() {
  await query(`
    alter table gift_payments
      add column if not exists guest_id text,
      add column if not exists guest_group_id text
  `);

  await query(`
    create index if not exists gift_payments_guest_group_status_idx
      on gift_payments (guest_group_id, status)
  `);
}

export async function createGiftPayment(input: GiftPaymentInput) {
  await ensureGiftPaymentSchema();

  const client = await getPool().connect();

  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock(hashtext($1))", [
      input.guestGroupId,
    ]);
    await client.query(
      `update gift_payments
       set status = 'expired',
         updated_at = now()
       where guest_group_id = $1
         and status in ('pending', 'in_process')
         and created_at < now() - interval '24 hours'`,
      [input.guestGroupId]
    );

    const limitResult = await client.query<{ total: number }>(
      `select count(*)::int as total
       from gift_payments
       where guest_group_id = $1
         and status = any($2::text[])`,
      [input.guestGroupId, validLimitStatuses]
    );
    const total = limitResult.rows[0]?.total ?? 0;

    if (total >= giftGroupLimit) {
      throw new GiftGroupLimitError();
    }

    await client.query(
      `insert into gift_payments (
      memory_id,
      guest_id,
      guest_group_id,
      guest_name,
      guest_email,
      amount,
      status,
      external_reference
    ) values ($1, $2, $3, $4, $5, $6, 'pending', $7)`,
      [
        input.memoryId,
        input.guestId,
        input.guestGroupId,
        input.guestName,
        input.guestEmail,
        input.amount,
        input.externalReference,
      ]
    );
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function setGiftPaymentPreference(
  externalReference: string,
  preferenceId: string
) {
  await query(
    `update gift_payments
     set mercado_pago_preference_id = $2,
       updated_at = now()
     where external_reference = $1`,
    [externalReference, preferenceId]
  );
}

export async function markGiftPaymentRejected(externalReference: string) {
  await query(
    `update gift_payments
     set status = 'rejected',
       updated_at = now()
     where external_reference = $1
       and status in ('pending', 'in_process')`,
    [externalReference]
  );
}

export async function syncGiftPaymentStatus(
  externalReference: string,
  status: string,
  mercadoPagoPaymentId?: string
) {
  const normalizedStatus = status === "cancelled" ? "canceled" : status;

  await query(
    `update gift_payments
     set status = $2,
       mercado_pago_payment_id = coalesce($3, mercado_pago_payment_id),
       updated_at = now()
     where external_reference = $1
       and status <> 'approved'`,
    [externalReference, normalizedStatus, mercadoPagoPaymentId ?? null]
  );
}

async function approvePaymentInTransaction(
  client: PoolClient,
  input: ApprovedPaymentInput
) {
  const paymentResult = await client.query<{
    id: string;
    memory_id: number;
    guest_name: string;
    status: GiftPaymentStatus;
  }>(
    `select id, memory_id, guest_name, status
     from gift_payments
     where external_reference = $1
     for update`,
    [input.externalReference]
  );
  const payment = paymentResult.rows[0];

  if (!payment) {
    return { unlocked: false, reason: "payment_not_found" };
  }

  if (payment.status === "approved") {
    return { unlocked: false, reason: "already_processed" };
  }

  await client.query(
    `update gift_payments
     set status = 'approved',
       mercado_pago_payment_id = $2,
       paid_amount = $3,
       approved_at = now(),
       updated_at = now()
     where id = $1`,
    [payment.id, input.mercadoPagoPaymentId, input.amount]
  );

  const existingUnlock = await client.query(
    `select id from unlocked_memories where gift_payment_id = $1 limit 1`,
    [payment.id]
  );

  if (existingUnlock.rowCount === 0) {
    await client.query(
      `insert into unlocked_memories (
        memory_id,
        gift_payment_id,
        guest_name,
        unlock_token
      ) values ($1, $2, $3, $4)`,
      [
        payment.memory_id,
        payment.id,
        payment.guest_name,
        crypto.randomBytes(32).toString("hex"),
      ]
    );
  }

  return { unlocked: true, reason: "approved" };
}

export async function approveGiftPayment(input: ApprovedPaymentInput) {
  const client = await getPool().connect();

  try {
    await client.query("begin");
    const result = await approvePaymentInTransaction(client, input);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function getUnlockedMemories() {
  const result = await query<{
    memory_id: number;
    guest_name: string;
    unlock_token: string;
  }>(
    `select distinct on (memory_id)
      memory_id,
      guest_name,
      unlock_token
     from unlocked_memories
     order by memory_id, created_at asc`
  );

  return result.rows;
}

export async function getGiftAdminRows() {
  const result = await query<GiftAdminRow>(
    `select
      um.id as unlock_id,
      um.memory_id,
      um.guest_name as public_guest_name,
      um.created_at as unlocked_at,
      gp.guest_name as payment_guest_name,
      gp.guest_email,
      gp.guest_id,
      gp.guest_group_id,
      gp.amount::text,
      gp.status,
      gp.approved_at,
      gp.created_at as payment_created_at
     from unlocked_memories um
     join gift_payments gp on gp.id = um.gift_payment_id
     order by um.memory_id asc, um.created_at asc`
  );

  return result.rows;
}

export async function updateUnlockedMemoryGuestName(
  unlockId: string,
  guestName: string
) {
  const result = await query<{ id: string }>(
    `update unlocked_memories
     set guest_name = $2
     where id = $1
     returning id`,
    [unlockId, guestName]
  );

  return (result.rowCount ?? 0) > 0;
}

export async function canRevealMemory(memoryId: number, token?: string | null) {
  if (token) {
    const byToken = await query(
      `select id
       from unlocked_memories
       where memory_id = $1 and unlock_token = $2
       limit 1`,
      [memoryId, token]
    );

    if ((byToken.rowCount ?? 0) > 0) {
      return true;
    }
  }

  const approved = await query(
    `select id from unlocked_memories where memory_id = $1 limit 1`,
    [memoryId]
  );

  return (approved.rowCount ?? 0) > 0;
}
