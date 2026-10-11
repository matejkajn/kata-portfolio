-- Iteration 2: administration.
--
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent.
--
-- Adds:
--   * admin_users        — allowlist of the Google accounts allowed to edit
--   * is_admin()         — helper used by every write policy
--   * site_settings      — one JSON document with all editable site copy
--   * process_steps      — "Jak probíhá kreativní proces" timeline
--   * testimonials       — "Reference klientů"
--   * write policies for projects / project_images / storage (admins only)
--   * hook_restrict_signup — optional Auth hook rejecting any other account

-- ---------------------------------------------------------------------------
-- Admin allowlist
-- ---------------------------------------------------------------------------

create table if not exists public.admin_users (
  email text primary key
);

alter table public.admin_users enable row level security;
-- No policies: the table is invisible to the API. is_admin() reads it as owner.

-- The two Google accounts allowed into the administration.
insert into public.admin_users (email) values
  ('matejkovec@gmail.com'),
  ('hrselova.katerina@gmail.com')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict do nothing;

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  description text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null default '',
  author text not null,
  role text not null default '',
  logo_url text,
  logo_width integer,
  logo_height integer,
  sort_order integer not null default 0
);

-- Seed with the copy that used to be hard-coded (only when empty).
insert into public.process_steps (label, description, sort_order)
select * from (values
  ('Analýza', 'Nejdříve se chci dozvědět co nejvíc o Vás, Vašem projektu a Vaší konkurenci. Připravím si otázky a společně si na vše odpovíme, ať vím, jakým směrem se vydat a co má výsledná práce splňovat.', 1),
  ('Návrh', 'Na základě předešlého kroku navrhnu moodboard, vizuální směr, kterým se budeme ubírat. Ukážeme si, jak se daný směr vymezuje oproti konkurenci. Ten si spolu schválíme.', 2),
  ('Realizace', 'Jakmile víme, kudy jdeme, pustím se do tvorby. Pracuji postupně a v průběhu Vás zapojuji, aby výsledek odpovídal Vašim představám a ne jen mým.', 3),
  ('Předání', 'Finální soubory dostanete přehledně zabalené a připravené k použití. Vysvětlím Vám, co jste dostali a jak s materiály pracovat, takže nezůstanete na nic sami.', 4)
) as seed(label, description, sort_order)
where not exists (select 1 from public.process_steps);

insert into public.testimonials (quote, author, role, logo_url, logo_width, logo_height, sort_order)
select * from (values
  ('Spolupráce přinesla naší značce jasný směr a jednotnou vizuální identitu, která nám dříve chyběla. Na dlouhodobé spolupráci oceňuji kvalitu návrhů a cit pro detail.', 'Jitka Hršelová', 'Majitelka společnosti', '/homepage/tetimonial1.png', 82, 61, 1),
  ('S Kátou dlouhodobě spolupracujeme na tvorbě reklamních materiálů a fotografií pro náš web a vždy se na ni můžeme spolehnout. Její práce má konzistentní styl, vysokou kvalitu a výrazně posouvá naši značku.', 'Ondřej Filip', 'Majitel společnosti', '/homepage/testimonial2.png', 82, 25, 2),
  ('Skvělá spolupráce s Katkou od začátku do konce. Oceňuji hlavně výbornou komunikaci, rychlé pochopení zadání i požadovaného stylu. Výstupy byly zpracované velmi rychle, profesionálně a přesně podle očekávání.', 'Denisa Bělská', 'Business development manager', '/homepage/testimonial3.png', 79, 59, 3)
) as seed(quote, author, role, logo_url, logo_width, logo_height, sort_order)
where not exists (select 1 from public.testimonials);

-- ---------------------------------------------------------------------------
-- Row level security: everyone reads, only admins write
-- ---------------------------------------------------------------------------

alter table public.site_settings enable row level security;
alter table public.process_steps enable row level security;
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['site_settings', 'process_steps', 'testimonials', 'projects', 'project_images']
  loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);

    execute format('drop policy if exists "admin insert" on public.%I', t);
    execute format('create policy "admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);

    execute format('drop policy if exists "admin update" on public.%I', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);

    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- Deleting a project removes its gallery rows too.
alter table public.project_images
  drop constraint if exists project_images_project_id_fkey,
  add constraint project_images_project_id_fkey
    foreign key (project_id) references public.projects (id) on delete cascade;

-- ---------------------------------------------------------------------------
-- Storage: admins may upload into the existing public `project-images` bucket
-- ---------------------------------------------------------------------------

drop policy if exists "admin upload project-images" on storage.objects;
create policy "admin upload project-images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admin update project-images" on storage.objects;
create policy "admin update project-images" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admin delete project-images" on storage.objects;
create policy "admin delete project-images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Optional: block sign-up for anyone not on the allowlist.
-- Enable in Dashboard → Authentication → Hooks → "Before User Created"
-- → Postgres function → public.hook_restrict_signup.
-- ---------------------------------------------------------------------------

create or replace function public.hook_restrict_signup(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.admin_users
    where lower(email) = lower(event -> 'user' ->> 'email')
  ) then
    return '{}'::jsonb;
  end if;

  return jsonb_build_object(
    'error', jsonb_build_object(
      'http_code', 403,
      'message', 'This account is not allowed to access the administration.'
    )
  );
end;
$$;

grant execute on function public.hook_restrict_signup(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_restrict_signup(jsonb) from authenticated, anon, public;
grant select on public.admin_users to supabase_auth_admin;
