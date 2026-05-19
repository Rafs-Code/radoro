-- ============================================================
-- Migration: Create Radoro Schema
-- Description: Settings, presets, tasks, sessions, quotes
-- ============================================================

-- ============================================================
-- 1. SETTINGS TABLE
-- One settings row per user (1:1 with profiles)
-- ============================================================

create table public.settings (
  id uuid primary key references public.profiles(id) on delete cascade,
  work_duration int not null default 25 check (work_duration > 0 and work_duration <= 180),
  short_break_duration int not null default 5 check (short_break_duration > 0 and short_break_duration <= 60),
  long_break_duration int not null default 15 check (long_break_duration > 0 and long_break_duration <= 60),
  long_break_interval int not null default 4 check (long_break_interval >= 2 and long_break_interval <= 10),
  auto_start_break boolean not null default true,
  auto_start_work boolean not null default false,
  tick_sound_enabled boolean not null default false,
  tick_sound text not null default 'soft' check (tick_sound in ('soft', 'mechanical', 'subtle')),
  alarm_sound text not null default 'bell' check (alarm_sound in ('bell', 'digital', 'gentle', 'chime')),
  alarm_volume int not null default 70 check (alarm_volume >= 0 and alarm_volume <= 100),
  animation_style text not null default 'circular' check (animation_style in ('circular', 'pulse', 'wave', 'dots', 'gradient', 'particle', 'minimal', 'glow')),
  cursor_effect_enabled boolean not null default false,
  notification_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

comment on table public.settings is 'Per-user settings for Radoro Pomodoro app';

alter table public.settings enable row level security;

create policy "Users can view own settings"
  on public.settings for select
  using (auth.uid() = id);

create policy "Users can insert own settings"
  on public.settings for insert
  with check (auth.uid() = id);

create policy "Users can update own settings"
  on public.settings for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create trigger on_settings_updated
  before update on public.settings
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 2. PRESETS TABLE
-- User-defined preset timer configurations
-- ============================================================

create table public.presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  work_duration int not null check (work_duration > 0 and work_duration <= 180),
  short_break_duration int not null check (short_break_duration > 0 and short_break_duration <= 60),
  long_break_duration int not null check (long_break_duration > 0 and long_break_duration <= 60),
  long_break_interval int not null check (long_break_interval >= 2 and long_break_interval <= 10),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.presets is 'Saved timer preset configurations';

create index presets_user_id_idx on public.presets(user_id);

alter table public.presets enable row level security;

create policy "Users can view own presets"
  on public.presets for select
  using (auth.uid() = user_id);

create policy "Users can insert own presets"
  on public.presets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own presets"
  on public.presets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own presets"
  on public.presets for delete
  using (auth.uid() = user_id);

create trigger on_preset_updated
  before update on public.presets
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 3. TASKS TABLE
-- User's task list to work on during pomodoros
-- ============================================================

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (length(title) > 0 and length(title) <= 200),
  completed boolean not null default false,
  pomodoros_done int not null default 0 check (pomodoros_done >= 0),
  pomodoros_estimate int check (pomodoros_estimate is null or pomodoros_estimate > 0),
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

comment on table public.tasks is 'User task list for Pomodoro sessions';

create index tasks_user_id_idx on public.tasks(user_id);
create index tasks_user_id_completed_idx on public.tasks(user_id, completed);

alter table public.tasks enable row level security;

create policy "Users can view own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

create trigger on_task_updated
  before update on public.tasks
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 4. SESSIONS TABLE
-- History of pomodoro sessions (for stats & heatmap)
-- ============================================================

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  type text not null check (type in ('work', 'short_break', 'long_break')),
  duration int not null check (duration > 0),
  planned_duration int not null check (planned_duration > 0),
  completed boolean not null default true,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  created_at timestamptz not null default now()
);

comment on table public.sessions is 'Record of completed Pomodoro sessions for statistics';

create index sessions_user_id_idx on public.sessions(user_id);
create index sessions_user_id_started_at_idx on public.sessions(user_id, started_at desc);
create index sessions_task_id_idx on public.sessions(task_id);

alter table public.sessions enable row level security;

create policy "Users can view own sessions"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on public.sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own sessions"
  on public.sessions for delete
  using (auth.uid() = user_id);


-- ============================================================
-- 5. QUOTES TABLE
-- Custom motivational quotes shown during timer
-- ============================================================

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  text text not null check (length(text) > 0 and length(text) <= 500),
  author text check (author is null or length(author) <= 100),
  show_during text not null default 'both' check (show_during in ('work', 'break', 'both')),
  created_at timestamptz not null default now()
);

comment on table public.quotes is 'Custom motivational quotes';

create index quotes_user_id_idx on public.quotes(user_id);

alter table public.quotes enable row level security;

create policy "Users can view own quotes"
  on public.quotes for select
  using (auth.uid() = user_id);

create policy "Users can insert own quotes"
  on public.quotes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own quotes"
  on public.quotes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own quotes"
  on public.quotes for delete
  using (auth.uid() = user_id);


-- ============================================================
-- 6. UPDATE handle_new_user FUNCTION
-- Auto-create profile + default settings + default preset
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Create profile
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');

  -- Create default settings
  insert into public.settings (id)
  values (new.id);

  -- Create default preset "Classic"
  insert into public.presets (user_id, name, work_duration, short_break_duration, long_break_duration, long_break_interval, is_default)
  values (new.id, 'Classic', 25, 5, 15, 4, true);

  return new;
end;
$$;