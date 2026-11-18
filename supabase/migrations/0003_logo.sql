-- Administration: editable site logo.
--
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query),
-- AFTER 0002_admin.sql. Safe to re-run: every statement is idempotent.
--
-- The logo lives in the existing `site_settings` document under
-- `content.brand.logoUrl`, so it is covered by the same RLS policies
-- (everyone reads, only admins write). Uploaded files go to the public
-- `project-images` bucket under `site/…`, which the 0002 storage policies
-- already allow admins to write.

-- Make sure the singleton row exists (in case 0002 was only partly applied).
insert into public.site_settings (id) values (1) on conflict do nothing;

-- Seed the current monogram as the logo, without touching a logo the admin
-- has already uploaded.
update public.site_settings
set
  content = jsonb_set(
    content,
    '{brand}',
    coalesce(content -> 'brand', '{}'::jsonb)
      || jsonb_build_object(
           'logoUrl',
           coalesce(nullif(content #>> '{brand,logoUrl}', ''), '/homepage/logo.png')
         ),
    true
  ),
  updated_at = now()
where id = 1
  and coalesce(content #>> '{brand,logoUrl}', '') = '';
