/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness for isolated TypeScript module tests. */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, mocks) {
  const source = ts.transpileModule(readFileSync(resolve(__dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    require: (name) => mocks[name] ?? require(name),
    process: { env: { DATABASE_URL: "postgres://localhost/test" } },
    console: { error() {} },
  });
  return exports;
}

function route(authenticated, grant) {
  return load("app/api/admin/gifts/route.ts", {
    "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
    "../shared": { isAdminAuthenticated: async () => authenticated },
    "../../../../lib/memories": { memories: [{ id: 1 }] },
    "../../../../lib/giftsDb": { grantMemoryWithoutPayment: grant },
  });
}

function request(body) {
  return new Request("http://localhost/api/admin/gifts", { method: "POST", body: JSON.stringify(body) });
}

test("manual grant requires admin authentication before processing input", async () => {
  const api = route(false, () => assert.fail("must not write"));
  assert.equal((await api.POST(request({ memoryId: 1, publicGuestName: "Ana" }))).status, 401);
});

test("invalid memory, malformed JSON and invalid names never write", async () => {
  const api = route(true, () => assert.fail("must not write"));
  for (const body of [null, {}, { memoryId: 2, publicGuestName: "Ana" },
    { memoryId: "1", publicGuestName: "Ana" }, { memoryId: 1, publicGuestName: 123 },
    { memoryId: 1, publicGuestName: "   " }, { memoryId: 1, publicGuestName: "a".repeat(81) }]) {
    assert.equal((await api.POST(request(body))).status, 400);
  }
  assert.equal((await api.POST(new Request("http://localhost", { method: "POST", body: "{" }))).status, 400);
});

test("valid grant trims the public name; duplicates and failures are reported", async () => {
  const api = route(true, async (id, name) => {
    assert.equal(id, 1);
    assert.equal(name, "Ana");
    return true;
  });
  assert.equal((await api.POST(request({ memoryId: 1, publicGuestName: " Ana " }))).status, 201);
  assert.equal((await route(true, async () => false).POST(request({ memoryId: 1, publicGuestName: "Ana" }))).status, 409);
  assert.equal((await route(true, async () => { throw new Error("database unavailable"); }).POST(request({ memoryId: 1, publicGuestName: "Ana" }))).status, 500);
});

function database({ existing = false, failUnlock = false } = {}) {
  const calls = [];
  let released = false;
  const client = {
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.startsWith("select id")) return { rowCount: existing ? 1 : 0 };
      if (sql.includes("insert into gift_payments")) return { rows: [{ id: "payment-id" }] };
      if (failUnlock && sql.includes("insert into unlocked_memories")) throw new Error("unlock failed");
      return { rows: [] };
    },
    release() { released = true; },
  };
  const api = load("lib/giftsDb.ts", { pg: { Pool: class {
    async connect() { return client; }
    async query(sql, params) { return client.query(sql, params); }
  } } });
  return { api, calls, released: () => released };
}

test("grant creates a zero-value manual record and a public unlock in one transaction", async () => {
  const db = database();
  assert.equal(await db.api.grantMemoryWithoutPayment(1, "Ana"), true);
  const payment = db.calls.find(({ sql }) => sql.includes("insert into gift_payments"));
  assert.match(payment.sql, /0, 0, 'manual_grant'/);
  const unlock = db.calls.find(({ sql }) => sql.includes("insert into unlocked_memories"));
  assert.equal(unlock.params[1], "payment-id");
  assert.equal(unlock.params[2], "Ana");
  assert.match(unlock.params[3], /^[a-f0-9]{64}$/);
  assert.equal(db.calls.at(-1).sql, "commit");
  assert.equal(db.released(), true);
});

test("existing unlock prevents writes; a failed unlock rolls back the manual record", async () => {
  const duplicate = database({ existing: true });
  assert.equal(await duplicate.api.grantMemoryWithoutPayment(1, "Ana"), false);
  assert.equal(duplicate.calls.some(({ sql }) => sql.includes("insert into")), false);
  assert.equal(duplicate.released(), true);
  const failure = database({ failUnlock: true });
  await assert.rejects(failure.api.grantMemoryWithoutPayment(1, "Ana"), /unlock failed/);
  assert.equal(failure.calls.at(-1).sql, "rollback");
  assert.equal(failure.released(), true);
});

test("a revealed memory cannot create a new payment, even from a stale page", async () => {
  const db = database({ existing: true });
  await assert.rejects(db.api.createGiftPayment({ memoryId: 1, guestGroupId: "family" }),
    (error) => error.name === "MemoryAlreadyUnlockedError");
  assert.equal(db.calls.some(({ sql }) => sql.includes("insert into")), false);
  assert.equal(db.calls.at(-1).sql, "rollback");
  assert.equal(db.released(), true);
});

test("public unlock listing exposes the chosen name without payment status", async () => {
  const api = load("app/api/unlocked-memories/route.ts", {
    "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
    "../../../lib/giftsDb": { getUnlockedMemories: async () => [
      { memory_id: 1, guest_name: "Ana e família", unlock_token: "token" },
    ] },
    "../../../lib/paymentSimulator": { isPaymentSimulatorEnabled: () => false },
  });
  assert.deepEqual(await (await api.GET()).json(), {
    success: true, memories: [{ memoryId: 1, guestName: "Ana e família", unlockToken: "token" }],
  });
});
