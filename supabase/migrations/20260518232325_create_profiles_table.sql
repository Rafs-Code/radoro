-- ============================================================
-- Migration: Create profiles table
-- Description: User profiles linked to auth.users
-- ============================================================

-- 1. Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  language text not null default 'en' check (language in ('en', 'id')),
  theme text not null default 'dark' check (theme in ('dark', 'light')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Add comment to table (for documentation)
comment on table public.profiles is 'User profile data linked to auth.users';

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 4. RLS Policy: Users can view their own profile
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- 5. RLS Policy: Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- 6. RLS Policy: Users can update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 7. Function to handle new user signup (auto-create profile)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$;

-- 8. Trigger: When new user signs up in auth.users, auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 9. Function to auto-update 'updated_at' timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 10. Trigger: Update 'updated_at' on profiles update
create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();