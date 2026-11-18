-- Reference cards redesign: portrait photo, company and star rating.
--
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query),
-- AFTER 0002_admin.sql. Safe to re-run: every statement is idempotent.
--
-- The old logo_url / logo_width / logo_height columns are kept (no data is
-- dropped) but are no longer shown on the site or in the administration.

alter table public.testimonials
  add column if not exists photo_url text,
  add column if not exists company text not null default '',
  add column if not exists rating smallint not null default 5;

alter table public.testimonials
  drop constraint if exists testimonials_rating_range,
  add constraint testimonials_rating_range check (rating between 1 and 5);

-- Fill in the companies of the originally seeded references (only where the
-- field is still empty, so edits made in the administration are kept).
update public.testimonials set company = 'Látky Rudolf'
  where author = 'Jitka Hršelová' and company = '';
update public.testimonials set company = 'Vidix'
  where author = 'Ondřej Filip' and company = '';
update public.testimonials set company = 'Springair'
  where author = 'Denisa Bělská' and company = '';
