-- Shivraj 350 manuscript submission backend
-- Student project by Pradeep Kumar
-- Run this complete file once in Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.manuscript_submissions (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_email text not null,
  phone text not null,
  institution text not null,
  department text not null,
  designation text not null,
  orcid text,
  article_title text not null,
  article_type text not null,
  discipline text not null,
  abstract text not null,
  keywords text[] not null,
  coauthors jsonb not null default '[]'::jsonb,
  manuscript_path text not null,
  original_work boolean not null check (original_work = true),
  ethics_accepted boolean not null check (ethics_accepted = true),
  status text not null default 'received',
  created_at timestamptz not null default now()
);

alter table public.manuscript_submissions enable row level security;

drop policy if exists "Public can create manuscript submissions" on public.manuscript_submissions;
create policy "Public can create manuscript submissions"
on public.manuscript_submissions
for insert
to anon, authenticated
with check (
  original_work = true
  and ethics_accepted = true
  and cardinality(keywords) between 4 and 6
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'manuscripts',
  'manuscripts',
  false,
  10485760,
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can upload manuscript PDFs" on storage.objects;
create policy "Public can upload manuscript PDFs"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'manuscripts');

-- No public SELECT policy is created. Manuscript details and PDFs remain private.
-- The college team can review records from the Supabase dashboard.
