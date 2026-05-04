-- SABO M&T — leads table for marketing site contact form
-- Apply: paste into Supabase SQL editor (dedicated SABO M&T project).

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  company       text,
  role          text,
  company_size  text,
  services      text[] default '{}',
  message       text not null,
  source        text default 'sabo.com.vn',
  user_agent    text,
  ip_hash       text,
  submitted_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists leads_submitted_at_idx
  on public.leads (submitted_at desc);

create index if not exists leads_email_idx
  on public.leads (email);

-- Lock down: only service_role can read/write. Public form uses service key on server side.
alter table public.leads enable row level security;
-- (no policies = deny by default for anon / authenticated)

-- Optional helper view for founder dashboard (service_role only)
create or replace view public.leads_recent as
  select id, name, email, phone, company, role, company_size,
         services, message, source, submitted_at
  from public.leads
  order by submitted_at desc
  limit 200;
