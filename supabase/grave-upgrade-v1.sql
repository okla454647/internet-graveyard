-- Internet Graveyard · Grave Upgrade V1
-- Run manually in the CORRECT Supabase project: internet-graveyard-v2
-- This migration only prepares storage for paid grave styles.
-- It does NOT enable payment and does NOT allow public users to self-upgrade.

begin;

alter table public.graves
  add column if not exists monument_tier text not null default 'standard';

alter table public.graves
  add column if not exists monument_upgraded_at timestamptz;

alter table public.graves
  add column if not exists monument_payment_ref text;

-- Keep the allowed values intentionally small for V1.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'graves_monument_tier_check'
      and conrelid = 'public.graves'::regclass
  ) then
    alter table public.graves
      add constraint graves_monument_tier_check
      check (monument_tier in ('standard','obsidian','gold'));
  end if;
end $$;

-- Existing rows stay on the free style.
update public.graves
set monument_tier = 'standard'
where monument_tier is null;

-- IMPORTANT SECURITY DESIGN:
-- There is deliberately NO anonymous/public UPDATE policy and NO owner RPC
-- that can set monument_tier. Paid tiers must only be written after a
-- verified payment by a trusted backend/serverless function.

commit;

-- Optional verification queries after running the migration:
-- select id, name, monument_tier, monument_upgraded_at
-- from public.graves
-- order by id desc
-- limit 10;
