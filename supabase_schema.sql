-- Supabase starter schema for multi-user resume storage.
-- Run in Supabase SQL Editor. Enable Email Auth in Authentication settings.
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'My Resume',
  template text not null default 't-modern',
  resume_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.resumes enable row level security;
create policy "Users can view their own resumes" on public.resumes
  for select using (auth.uid() = user_id);
create policy "Users can create their own resumes" on public.resumes
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own resumes" on public.resumes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own resumes" on public.resumes
  for delete using (auth.uid() = user_id);
create index if not exists resumes_user_id_idx on public.resumes(user_id);
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists set_resumes_updated_at on public.resumes;
create trigger set_resumes_updated_at before update on public.resumes
for each row execute procedure public.set_updated_at();
