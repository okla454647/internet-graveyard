-- Internet Graveyard: paid flower gifts v1
-- Run once in the correct Supabase project: internet-graveyard-v2

begin;

alter table public.graves
  add column if not exists paid_flower_count integer not null default 0;

alter table public.graves
  drop constraint if exists graves_paid_flower_count_nonnegative;
alter table public.graves
  add constraint graves_paid_flower_count_nonnegative
  check (paid_flower_count >= 0);

create table if not exists public.flower_gifts (
  id uuid primary key default gen_random_uuid(),
  grave_id bigint not null references public.graves(id) on delete cascade,
  gift_type text not null,
  flower_value integer not null,
  amount_usd numeric(10,2) not null,
  currency text not null default 'USD',
  display_name text,
  message text,
  payment_provider text,
  payment_ref text unique,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  constraint flower_gifts_type_check check (gift_type in ('rose','bouquet','wreath')),
  constraint flower_gifts_value_check check (flower_value in (5,25,100)),
  constraint flower_gifts_amount_check check (amount_usd >= 0),
  constraint flower_gifts_currency_check check (currency = 'USD'),
  constraint flower_gifts_status_check check (status in ('pending','paid','refunded')),
  constraint flower_gifts_display_name_len check (display_name is null or char_length(display_name) <= 40),
  constraint flower_gifts_message_len check (message is null or char_length(message) <= 120)
);

create index if not exists flower_gifts_grave_paid_idx
  on public.flower_gifts(grave_id, paid_at desc)
  where status = 'paid';

alter table public.flower_gifts enable row level security;

drop policy if exists "Public can read paid flower gifts" on public.flower_gifts;
create policy "Public can read paid flower gifts"
  on public.flower_gifts
  for select
  to anon, authenticated
  using (status = 'paid');

-- Intentionally no public INSERT/UPDATE/DELETE policies.
-- Paid gifts must only be created/finalized by a trusted payment backend.

grant select on public.flower_gifts to anon, authenticated;
grant select (paid_flower_count) on public.graves to anon, authenticated;

create or replace view public.flower_gifts_public
with (security_invoker = true)
as
select
  id,
  grave_id,
  gift_type,
  flower_value,
  display_name,
  message,
  paid_at,
  created_at
from public.flower_gifts
where status = 'paid';

grant select on public.flower_gifts_public to anon, authenticated;

commit;

-- Verification
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'graves'
  and column_name = 'paid_flower_count';

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name = 'flower_gifts';
