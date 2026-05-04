/**
 * Lead scoring + classification — aligned with docs/lead_system_full.md
 */

export type LeadInput = {
  painLevel: number;
  businessSize: number;
  budget: number;
  readiness: number;
  decisionRole: number;
};

export function calculateLeadScore(input: LeadInput): number {
  const raw =
    input.painLevel +
    input.businessSize +
    input.budget +
    input.readiness +
    input.decisionRole;
  return Math.max(0, Math.min(100, raw));
}

export function classifyLead(score: number): 'hot_lead' | 'warm_lead' | 'cold_lead' {
  if (score >= 70) return 'hot_lead';
  if (score >= 40) return 'warm_lead';
  return 'cold_lead';
}

export function getNextAction(score: number): 'book_demo_now' | 'offer_audit' | 'send_lead_magnet' {
  if (score >= 70) return 'book_demo_now';
  if (score >= 40) return 'offer_audit';
  return 'send_lead_magnet';
}

export function leadStatusFromScore(score: number): string {
  const c = classifyLead(score);
  if (c === 'hot_lead') return 'qualified';
  if (c === 'warm_lead') return 'qualified';
  return 'new_lead';
}

/** Map API string fields → numeric buckets (0–100 model). Heuristic, tunable. */
export function scoreFromLeadPayload(p: {
  main_pain?: string;
  business_size?: string;
  budget_range?: string;
  urgency?: string;
  decision_role?: string;
}): LeadInput {
  const painText = (p.main_pain || '').toLowerCase();
  let painLevel = 10;
  if (painText.length > 80) painLevel = 20;
  if (/gấp|khẩn|urgent|asap|ngay|tuần này|this week|this month/i.test(painText + (p.urgency || ''))) {
    painLevel = 28;
  } else if (painText.length > 15) painLevel = 18;

  const size = (p.business_size || '').toLowerCase();
  let businessSize = 5;
  if (/20\+|20\+|50\+|100/i.test(size)) businessSize = 20;
  else if (/6|10|15|20|team|department/i.test(size)) businessSize = 15;
  else if (/2|3|4|5|nhỏ|small/i.test(size)) businessSize = 10;

  const budget = (p.budget_range || '').toLowerCase();
  let budgetPts = 5;
  if (/50|100|tỷ|billion/i.test(budget)) budgetPts = 20;
  else if (/15|20|30|40|50m/i.test(budget)) budgetPts = 17;
  else if (/5|10|15m/i.test(budget)) budgetPts = 12;
  else if (/5m|<5/i.test(budget)) budgetPts = 8;

  const urg = (p.urgency || '').toLowerCase();
  let readiness = 5;
  if (/now|ngay|today|hôm nay|ready|sẵn sàng/i.test(urg)) readiness = 20;
  else if (/tuần|week|demo|tháng|month/i.test(urg)) readiness = 15;
  else if (/interested|quan tâm|đang tìm/i.test(urg)) readiness = 10;

  const role = (p.decision_role || '').toLowerCase();
  let decisionRole = 3;
  if (/founder|ceo|giám đốc|owner|chủ/i.test(role)) decisionRole = 10;
  else if (/manager|trưởng|head|lead/i.test(role)) decisionRole = 6;

  return { painLevel, businessSize, budget: budgetPts, readiness, decisionRole };
}
