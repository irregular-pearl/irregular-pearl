-- Auto-create public.users row when a new user signs up via auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    display_name = coalesce(excluded.display_name, public.users.display_name),
    avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url);
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if any
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill: create public.users rows for any existing auth.users that don't have one
insert into public.users (id, display_name, avatar_url)
select
  id,
  coalesce(raw_user_meta_data->>'full_name', email),
  raw_user_meta_data->>'avatar_url'
from auth.users
where id not in (select id from public.users)
on conflict (id) do nothing;
