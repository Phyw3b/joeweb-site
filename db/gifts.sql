create extension if not exists pgcrypto;

create table if not exists gift_payments (
  id uuid primary key default gen_random_uuid(),
  memory_id integer not null,
  guest_id text,
  guest_group_id text,
  guest_name text not null,
  guest_email text not null,
  amount numeric(10, 2) not null,
  paid_amount numeric(10, 2),
  status text not null default 'pending',
  external_reference text not null unique,
  mercado_pago_preference_id text,
  mercado_pago_payment_id text unique,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists unlocked_memories (
  id uuid primary key default gen_random_uuid(),
  memory_id integer not null,
  gift_payment_id uuid not null unique references gift_payments(id),
  guest_name text not null,
  unlock_token text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists gift_payments_external_reference_idx
  on gift_payments (external_reference);

create index if not exists gift_payments_guest_group_status_idx
  on gift_payments (guest_group_id, status);

create index if not exists unlocked_memories_memory_id_idx
  on unlocked_memories (memory_id);
