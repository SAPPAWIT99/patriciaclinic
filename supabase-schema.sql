create table if not exists public.app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

drop policy if exists "PatriciaClinic read app state" on public.app_state;
drop policy if exists "PatriciaClinic insert app state" on public.app_state;
drop policy if exists "PatriciaClinic update app state" on public.app_state;

create policy "PatriciaClinic read app state"
on public.app_state
for select
to anon
using (id = 'patriciaclinic-main');

create policy "PatriciaClinic insert app state"
on public.app_state
for insert
to anon
with check (id = 'patriciaclinic-main');

create policy "PatriciaClinic update app state"
on public.app_state
for update
to anon
using (id = 'patriciaclinic-main')
with check (id = 'patriciaclinic-main');
