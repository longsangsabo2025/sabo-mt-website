-- SABO M&T — Lead engine: scoring fields, conversations, demo bookings
-- Apply in Supabase SQL editor or `supabase db push` (same project as 20260429_init_leads).

-- ─── Extend public.leads ───────────────────────────────────────────────────
alter table public.leads
  add column if not exists full_name text,
  add column if not exists industry text,
  add column if not exists main_pain text,
  add column if not exists current_process text,
  add column if not exists budget_range text,
  add column if not exists urgency text,
  add column if not exists preferred_channel text,
  add column if not exists lead_score integer not null default 0,
  add column if not exists lead_status text not null default 'new_lead',
  add column if not exists next_action text,
  add column if not exists notes text,
  add column if not exists chat_state jsonb not null default '{}'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists leads_lead_status_idx on public.leads (lead_status);
create index if not exists leads_lead_score_idx on public.leads (lead_score desc);
create index if not exists leads_industry_idx on public.leads (industry);

create or replace function public.leads_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.leads_set_updated_at();

-- ─── lead_conversations ────────────────────────────────────────────────────
create table if not exists public.lead_conversations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  session_id text,
  message_role text not null check (message_role in ('user', 'assistant', 'system')),
  message_content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lead_conversations_lead_id_idx
  on public.lead_conversations (lead_id, created_at desc);

alter table public.lead_conversations enable row level security;

-- ─── demo_bookings ─────────────────────────────────────────────────────────
create table if not exists public.demo_bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  booking_time timestamptz not null,
  meeting_channel text,
  meeting_link text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists demo_bookings_lead_id_idx on public.demo_bookings (lead_id);
create index if not exists demo_bookings_booking_time_idx on public.demo_bookings (booking_time);

alter table public.demo_bookings enable row level security;

-- ─── Refresh helper view ────────────────────────────────────────────────────
-- DROP required: CREATE OR REPLACE VIEW cannot rename columns vs old leads_recent.
drop view if exists public.leads_recent;
create view public.leads_recent as
  select id, name, full_name, email, phone, company, role, company_size,
         industry, main_pain, budget_range, urgency, preferred_channel,
         lead_score, lead_status, next_action, source, submitted_at, updated_at
  from public.leads
  order by submitted_at desc
  limit 200;
