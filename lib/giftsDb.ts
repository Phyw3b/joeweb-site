import crypto from "crypto";
import { Pool, PoolClient, QueryResultRow } from "pg";

export type GiftPaymentStatus = "pending" | "approved" | "rejected";

type GiftPaymentInput = {
  memoryId: number;
  guestName: string;
  guestEmail: string;
  amount: number;
  externalReference: string;
  preferenceId?: string;
};

type ApprovedPaymentInput = {
  externalReference: string;
  mercadoPagoPaymentId: string;
  amount: number;
};

let pool: Pool | null = null;

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

export async function createGiftPayment(input: GiftPaymentInput) {
  await query(
    `insert into gift_payments (
      memory_id,
      guest_name,
      guest_email,
      amount,
      status,
      external_reference,
      mercado_pago_preference_id
    ) values ($1, $2, $3, $4, 'pending', $5, $6)`,
    [
      input.memoryId,
      input.guestName,
      input.guestEmail,
      input.amount,
      input.externalReference,
      input.preferenceId ?? null,
    ]
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
