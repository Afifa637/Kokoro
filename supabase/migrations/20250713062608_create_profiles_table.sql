create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  mood text,
  created_at timestamp with time zone default timezone('utc', now())
);
