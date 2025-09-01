# MyCinemaList

**MyCinemaList** is a modern movie discovery and review platform built with React, TypeScript, and Vite. It allows users to browse trending films, filter by genre or title, save movies in their own lists, and securely manage their accounts using Supabase and TMDB.

## Demo

- [my-cinema-list.vercel.app](https://my-cinema-list.vercel.app)
- [mycinemalist.onrender.com](https://mycinemalist.onrender.com)
  
## Features

- User Authentication via [Supabase](https://supabase.com) (Sign up, Sign in, password reset)
- Movie Browsing with data from [TMDB API](https://developer.themoviedb.org)
- Filtering by title and genre
- Favourites, Must Watch and Watched Lists saved per user (Supabase DB)
- Context Providers for Auth and Movie state
- Storybook for UI component development
- Vite provides fast builds and instant hot module replacement for a smooth development experience
- Responsive Design with MUI

## Tech I Used
- React + TypeScript
- Vite (for fast builds)
- Supabase (auth + backend)
- TMDB API (movie data)
- MUI (Material UI)
- Storybook
- ESLint + Prettier

## How to Run Locally  
```bash
git clone https://github.com/ZuMaVla/MyCinemaList
cd MyCinemaList
npm install
npm run dev
```
Create a .env file in the root folder with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_KEY=your_tmdb_api_key
VITE_ENV=development

## Supabase Schema Setup
Before running the app, make sure your Supabase project includes the correct tables and triggers. You can copy and paste the following SQL into the Supabase SQL editor:
```Sql
-- Lists table
create table if not exists lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  type text check (type in ('favourite', 'mustwatch', 'watched', 'custom'))
);

-- List items table
create table if not exists list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid references lists(id) on delete cascade,
  movie_id int not null,
  added_at timestamp default now(),
  unique(list_id, movie_id)
);

-- Indexes
create index if not exists idx_lists_user on lists(user_id);
create index if not exists idx_list_items_list on list_items(list_id);
create index if not exists idx_list_items_movie on list_items(movie_id);

-- Trigger to create default lists when a new user is added
create or replace function public.create_default_lists()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.lists (user_id, name, type)
  values
    (new.id, 'Favourites', 'favourite'),
    (new.id, 'Must Watch', 'mustwatch'),
    (new.id, 'Watched', 'watched');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_default_lists();
```

## Supabase Redirect Setup
To make password reset and sign-in links work, I added these to Supabase's redirect allow list:
- http://localhost:3000/**
- https://mycinemalist.onrender.com/**

## Storybook
To run components in isolation:
```
npm run storybook
```

## Contributing
This project is intended for educational purposes and contributions are not expected.



