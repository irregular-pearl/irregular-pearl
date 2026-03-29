-- Migration 002: Extend users table for artist profiles
-- Run this in Supabase SQL Editor

-- Add profile fields to users table
alter table public.users add column if not exists avatar_url text;
alter table public.users add column if not exists bio text default '';
alter table public.users add column if not exists website text;
alter table public.users add column if not exists social_links jsonb default '{}';
alter table public.users add column if not exists genres text[] default '{}';
alter table public.users add column if not exists location text;
alter table public.users add column if not exists ensembles text[] default '{}';

-- Discography table
create table if not exists public.discography (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  year integer,
  role text,
  url text,
  created_at timestamptz default now() not null
);

-- Performance history
create table if not exists public.performances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_name text not null,
  venue text,
  date date,
  piece_id text references public.pieces(id) on delete set null,
  is_upcoming boolean default false,
  created_at timestamptz default now() not null
);

-- Indexes
create index if not exists idx_discography_user on public.discography(user_id);
create index if not exists idx_performances_user on public.performances(user_id);
create index if not exists idx_performances_date on public.performances(date);

-- RLS
alter table public.discography enable row level security;
alter table public.performances enable row level security;

create policy "Discography viewable by everyone" on public.discography for select using (true);
create policy "Users can manage own discography" on public.discography for insert with check (auth.uid() = user_id);
create policy "Users can update own discography" on public.discography for update using (auth.uid() = user_id);
create policy "Users can delete own discography" on public.discography for delete using (auth.uid() = user_id);

create policy "Performances viewable by everyone" on public.performances for select using (true);
create policy "Users can manage own performances" on public.performances for insert with check (auth.uid() = user_id);
create policy "Users can update own performances" on public.performances for update using (auth.uid() = user_id);
create policy "Users can delete own performances" on public.performances for delete using (auth.uid() = user_id);
