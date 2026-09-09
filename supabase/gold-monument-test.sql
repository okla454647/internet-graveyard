-- Gold Monument test helper for Internet Graveyard
-- Targets the current test grave named 測試升級墓碑.
-- It only updates when that name matches exactly one project grave.

with target as (
  select id
  from public.graves
  where grave_type = 'project'
    and name = '測試升級墓碑'
),
unique_target as (
  select min(id) as id
  from target
  having count(*) = 1
)
update public.graves g
set monument_tier = 'gold',
    monument_upgraded_at = now()
from unique_target u
where g.id = u.id;

select id, type_number, name, monument_tier, monument_upgraded_at
from public.graves
where grave_type = 'project'
  and name = '測試升級墓碑';
