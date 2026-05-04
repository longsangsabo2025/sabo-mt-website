// English mirror content — Phase 1
// Mirrors the structure of site.ts; loaded by /en/* pages

import type { ServiceTier, CaseStudy } from './site';

export const SITE_EN = {
  oneLiner: 'Custom AI Solutions Studio — building software and media solutions for Vietnamese businesses.',
  tagline: 'Build. Automate. Create.'
};

export const PROBLEMS_EN = [
  {
    label: 'Manual operations that don\'t scale',
    body: 'Repeated processes consume headcount but break under growth. Operational errors come from people, not from system design.',
    cta: 'Solution',
    href: '/en/services/automate'
  },
  {
    label: 'Fragmented data, slow decisions',
    body: 'Each department in its own spreadsheet. Pulling a single executive report takes days. Insight always lags decision-making.',
    cta: 'Solution',
    href: '/en/services/build'
  },
  {
    label: 'Not enough content volume — production is slow and expensive',
    body: 'You need images, videos, and content for marketing and product — but the team is small and the budget is tight. Traditional production can\'t keep pace with shipping speed.',
    cta: 'Solution',
    href: '/en/services/create'
  }
];

// Reuses the same slug/number/title as VI version so [slug] params line up.
export const SERVICES_EN: ServiceTier[] = [
  {
    slug: 'build', number: '01',
    eyebrow: 'CUSTOM SOFTWARE',
    title: 'Build',
    description: 'Apps, websites, web apps — coded to your real business needs. No templated patchwork, no vendor lock-in. AI is built into the layer from day one.',
    subServices: ['Web apps & dashboards', 'Mobile (iOS/Android)', 'Backend, API & system integration', 'Database & data architecture'],
    outcomes: [
      'Production-ready product in 8–16 weeks',
      '100% code ownership — no vendor lock-in',
      'AI layer integrated from day one',
      'Complete technical hand-off documentation'
    ],
    scenarios: [
      { label: 'Have an idea, need a delivery partner', body: 'Plan and scope are clear — you need a delivery team that commits to timeline and quality.' },
      { label: 'Legacy product needs a rebuild', body: 'Slow, hard-to-maintain, can\'t scale — needs redesign and rebuild with data inheritance.' },
      { label: 'Need an MVP to test the market', body: 'A real product in customers\' hands within 8–12 weeks to validate hypothesis before larger investment.' }
    ]
  },
  {
    slug: 'automate', number: '02',
    eyebrow: 'AI & WORKFLOW',
    title: 'Automate',
    description: 'Workflow automation, AI agents, system integration — free your team from repetitive work. Internal tools talk to each other. AI handles volume without adding headcount.',
    subServices: ['Workflow automation (n8n, Make, custom)', 'AI agents & LLM integration', 'API & system integration', 'Data pipeline & sync'],
    outcomes: [
      'At least 50% reduction in repetitive tasks',
      'AI agents working 24/7',
      'Internal tools unified into a single flow',
      'Measurable ROI within the first month'
    ],
    scenarios: [
      { label: 'Team drowning in copy-paste', body: 'Staff spend most of their time copying data between systems — automation lets them focus on higher-value work.' },
      { label: 'Tools don\'t talk to each other', body: 'CRM, accounting, inventory, marketing — each in its own silo. You need an integration layer so data flows automatically.' },
      { label: 'Need AI to handle volume', body: 'Order / ticket / inquiry volume is climbing fast — you want AI agents to handle it instead of hiring more people.' }
    ]
  },
  {
    slug: 'create', number: '03',
    eyebrow: 'AI MEDIA',
    title: 'Create',
    description: 'Images, videos, content pipelines powered by AI — broadcast-quality output at 1/10 the cost of traditional production. Volume liberated for marketing, A/B testing, social, and brand.',
    subServices: ['Product & brand asset generation', 'Video content pipelines', 'Multilingual voiceover & TTS', 'Auto YouTube / TikTok / Reels factories'],
    outcomes: [
      'Media costs reduced 80–90% vs. traditional production',
      'Output volume 10–50× vs. manual teams',
      'Broadcast-ready quality',
      'Automatic brand consistency to your guidelines'
    ],
    scenarios: [
      { label: 'Need volume content on a tight budget', body: 'Marketing needs hundreds of assets per month — hiring an agency is too expensive, in-house is too slow.' },
      { label: 'Production too slow for A/B testing', body: 'You want to test 10 creative variants — but traditional production can only ship one.' },
      { label: 'Want to launch a YouTube/TikTok channel', body: 'You have channel ideas but a small team — you need an AI pipeline to ship 3–30 videos per week.' }
    ]
  }
];

export const PROCESS_EN = [
  { num: '01', label: 'Discover', body: 'Understand the business, quantify problems, set committed KPIs.' },
  { num: '02', label: 'Design', body: 'Design the end-to-end solution — technical, operational, and budget.' },
  { num: '03', label: 'Deliver', body: 'Sprint-based delivery with regular demos and complete documentation hand-off.' },
  { num: '04', label: 'Optimize', body: 'Operate, measure, iterate based on real usage data.' }
];

export const DIFFERENTIATORS_EN = [
  { title: 'Outcomes-driven', body: 'Measure ROI, not deliverable counts.' },
  { title: 'Industry-focused', body: 'Understand the business before writing code.' },
  { title: 'End-to-end', body: 'Strategy + Build + Operate under one roof — no hand-off gaps.' },
  { title: 'AI-native', body: 'An AI layer is built into every solution from day one.' },
  { title: 'Commitment-based', body: 'Concrete KPI commitments — no "best effort".' }
];

export const INDUSTRIES_EN = [
  { slug: 'sports', label: 'Sports & Entertainment', desc: 'Tournament platform, fan engagement, ranking system.', active: true },
  { slug: 'real-estate', label: 'Real Estate', desc: 'Property listing, sales pipeline, customer journey.', active: true },
  { slug: 'hospitality', label: 'Hospitality', desc: 'Booking, POS, loyalty, multi-venue operations.', active: true },
  { slug: 'education', label: 'Education', desc: 'Learning platform, content authoring, assessment.', active: true },
  { slug: 'retail', label: 'Retail', desc: 'Omnichannel commerce, inventory, customer 360°.', active: false },
  { slug: 'finance', label: 'Finance', desc: 'Internal automation, compliance, reporting.', active: false }
];

export const METRICS_EN = [
  { value: '15+', label: 'Digital products shipped' },
  { value: '4',   label: 'Industries served' },
  { value: '3+',  label: 'Years building AI products' },
  { value: '6',   label: 'Technology partners' }
];

export const CASE_STUDIES_EN: CaseStudy[] = [
  {
    slug: 'sabo-arena',
    industry: 'Sports & Entertainment', industrySlug: 'sports',
    title: 'SABO Arena — Tournament platform for the billiards community',
    oneLiner: 'A tournament platform with automated ranking and skill-based matchmaking.',
    metric: '5,000+ registered players in the first 3 months',
    timeline: '6-month rollout',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['Web platform', 'Mobile app', 'Real-time matchmaking'],
    challenge: 'A local billiards community ran tournaments manually through Facebook and Excel. There was no standard ranking system, and bracket/result updates consumed many hours each week.',
    solution: 'We built an end-to-end platform: web admin + mobile app for players, automatic ELO ranking, skill-based matchmaking, and live streaming for marquee matches.',
    impact: [
      { value: '5,000+', label: 'Registered players' },
      { value: '12h → 2h', label: 'Time to organize one tournament' },
      { value: '99.5%', label: 'Uptime during the season' },
      { value: '3x', label: 'Tournaments per month' }
    ]
  },
  {
    slug: 'sabohub',
    industry: 'Hospitality', industrySlug: 'hospitality',
    title: 'SABOHUB — Multi-venue operations platform',
    oneLiner: 'Multi-branch F&B / billiards club management with integrated POS, booking, and loyalty.',
    metric: '40% reduction in end-of-day closing time',
    timeline: '4-month rollout',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['POS integration', 'Multi-tenant SaaS', 'Analytics dashboard'],
    challenge: 'A venue chain used three different software products for POS, booking, and loyalty. Consolidated reports required manual Excel exports — numbers never matched.',
    solution: 'We designed a unified orchestration layer over the three vendor APIs, plus a real-time dashboard for the chain owner and a customer loyalty app. Migration with zero downtime during off-peak hours.',
    impact: [
      { value: '40%', label: 'Faster closing' },
      { value: '3 → 1', label: 'Software products to manage' },
      { value: '24/7', label: 'Real-time operations dashboard' },
      { value: '+22%', label: 'Loyalty repeat-visit rate' }
    ]
  },
  {
    slug: 'vungtauland',
    industry: 'Real Estate', industrySlug: 'real-estate',
    title: 'Vũng Tàu Dream Homes — Real estate platform',
    oneLiner: 'A real-estate platform purpose-built for the Vũng Tàu market — smart search, simple listings, direct buyer-to-owner connection.',
    metric: 'Sales cycle shortened by 30%',
    timeline: '5-month rollout',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['CRM', 'WhatsApp/Zalo bot', 'Document automation'],
    challenge: 'Sales teams across multiple projects tracked leads in spreadsheets. Status was always stale, and conversion bottlenecks were invisible.',
    solution: 'We deployed a CRM tied to a messaging-platform bot (Zalo + WhatsApp) for lead nurturing, plus contract document automation that cut signing-prep time by half.',
    impact: [
      { value: '30%', label: 'Shorter sales cycle' },
      { value: '2x', label: 'Lead conversion rate' },
      { value: '50%', label: 'Less contract prep time' },
      { value: '100%', label: 'Pipeline visibility for leadership' }
    ]
  },
  {
    slug: 'ainewbievn',
    industry: 'Community / AI', industrySlug: 'community',
    title: 'AINewbieVN — AI community & automation platform',
    oneLiner: 'A digital-product, automation-workflow and tech-talent network for the Vietnamese AI community.',
    metric: '5x build velocity using AI-native methods',
    timeline: 'Continuous, since 2024',
    servicesUsed: ['Build', 'Automate'],
    techCategory: ['LLM orchestration', 'Knowledge graph', 'Codebase indexing'],
    challenge: 'Most teams use AI as autocomplete. We needed a methodology that turns AI into an architecture, refactoring, and code-review partner.',
    solution: 'We built and shipped tools — GitNexus (semantic codebase index), Graphify (knowledge-graph) — and codified a proven AI-native delivery flow. Now used across SABO\'s own products.',
    impact: [
      { value: '5x', label: 'Build velocity (LOC/day)' },
      { value: '142x', label: 'Token reduction via knowledge graph' },
      { value: '3+', label: 'Internal tools open-sourced' },
      { value: '4', label: 'Industries currently applying' }
    ]
  }
];

export const ROLES_EN = [
  'Founder / CEO', 'C-level / Director', 'Department Head', 'Technical Lead', 'Project Manager', 'Other'
];

export const COMPANY_SIZES_EN = ['1–10', '11–50', '51–200', '200–1,000', '1,000+'];
