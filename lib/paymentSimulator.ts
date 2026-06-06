import crypto from "crypto";
import fs from "fs";
import path from "path";
import { normalizeSearchText } from "./googleSheets";

export type SimulatedPaymentStatus =
  | "pending"
  | "in_process"
  | "approved"
  | "paid"
  | "confirmed"
  | "rejected"
  | "canceled"
  | "expired";

type SimulatedPayment = {
  id: string;
  memoryId: number;
  guestId: string;
  guestGroupId: string;
  guestName: string;
  guestEmail: string;
  amount: number;
  status: SimulatedPaymentStatus;
  externalReference: string;
  preferenceId: string;
  unlockToken?: string;
  createdAt: string;
  updatedAt: string;
};

type SimulatedStore = {
  payments: SimulatedPayment[];
};

type CreateSimulatedPaymentInput = {
  memoryId: number;
  guestId?: string;
  guestGroupId?: string;
  guestName: string;
  guestEmail: string;
  amount: number;
  externalReference: string;
};

const validLimitStatuses = [
  "paid",
  "approved",
  "confirmed",
  "pending",
  "in_process",
];
const giftGroupLimit = 2;
const storePath = path.join(process.cwd(), ".local-payment-simulator.json");

const simulatorGuests = [
  {
    guestId: "sim-a-1",
    guestGroupId: "sim-family-a",
    names: ["familia teste a", "teste familia a", "teste a1", "teste a2"],
    guestName: "Família Teste A",
  },
  {
    guestId: "sim-b-1",
    guestGroupId: "sim-family-b",
    names: ["familia teste b", "teste familia b", "teste b1", "teste b2"],
    guestName: "Família Teste B",
  },
];

export class SimulatedGiftGroupLimitError extends Error {
  constructor() {
    super(
      "Esse grupo familiar já desbloqueou o limite de memórias disponíveis. Nossa ideia é que todos possam participar dessa história com carinho. ❤️"
    );
    this.name = "SimulatedGiftGroupLimitError";
  }
}

export function isPaymentSimulatorEnabled() {
  return process.env.PAYMENT_SIMULATOR === "true";
}

function readStore(): SimulatedStore {
  if (!fs.existsSync(storePath)) {
    return { payments: [] };
  }

  return JSON.parse(fs.readFileSync(storePath, "utf8")) as SimulatedStore;
}

function writeStore(store: SimulatedStore) {
  fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function findSimulatedGuestGroup(guestName: string) {
  const search = normalizeSearchText(guestName);
  const guest = simulatorGuests.find((item) => item.names.includes(search));

  if (!guest) {
    return null;
  }

  return {
    guestId: guest.guestId,
    guestName: guest.guestName,
    guestGroupId: guest.guestGroupId,
  };
}

export function createSimulatedGiftPayment(input: CreateSimulatedPaymentInput) {
  const guestGroup =
    input.guestId && input.guestGroupId
      ? {
          guestId: input.guestId,
          guestName: input.guestName,
          guestGroupId: input.guestGroupId,
        }
      : findSimulatedGuestGroup(input.guestName);

  if (!guestGroup) {
    return { ok: false as const, reason: "guest_not_found" };
  }

  const store = readStore();
  const now = new Date().toISOString();
  const total = store.payments.filter(
    (payment) =>
      payment.guestGroupId === guestGroup.guestGroupId &&
      validLimitStatuses.includes(payment.status)
  ).length;

  if (total >= giftGroupLimit) {
    throw new SimulatedGiftGroupLimitError();
  }

  const preferenceId = `sim_${crypto.randomUUID()}`;
  store.payments.push({
    id: crypto.randomUUID(),
    memoryId: input.memoryId,
    guestId: guestGroup.guestId,
    guestGroupId: guestGroup.guestGroupId,
    guestName: guestGroup.guestName,
    guestEmail: input.guestEmail,
    amount: input.amount,
    status: "pending",
    externalReference: input.externalReference,
    preferenceId,
    createdAt: now,
    updatedAt: now,
  });
  writeStore(store);

  return {
    ok: true as const,
    preferenceId,
  };
}

export function updateSimulatedPaymentStatus(
  externalReference: string,
  status: SimulatedPaymentStatus
) {
  const store = readStore();
  const payment = store.payments.find(
    (item) => item.externalReference === externalReference
  );

  if (!payment) {
    return null;
  }

  payment.status = status;
  payment.updatedAt = new Date().toISOString();

  if (status === "approved" && !payment.unlockToken) {
    payment.unlockToken = crypto.randomBytes(32).toString("hex");
  }

  writeStore(store);
  return payment;
}

export function getSimulatedUnlockedMemories() {
  const store = readStore();

  return store.payments
    .filter((payment) => payment.status === "approved" && payment.unlockToken)
    .map((payment) => ({
      memory_id: payment.memoryId,
      guest_name: payment.guestName,
      unlock_token: payment.unlockToken ?? "",
    }));
}

export function canRevealSimulatedMemory(memoryId: number, token?: string | null) {
  if (!token) {
    return false;
  }

  return readStore().payments.some(
    (payment) =>
      payment.memoryId === memoryId &&
      payment.status === "approved" &&
      payment.unlockToken === token
  );
}

export function resetPaymentSimulator() {
  writeStore({ payments: [] });
}
