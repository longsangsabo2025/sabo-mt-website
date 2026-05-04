/**
 * Uyển Nhi-style step flow — sabo_ai_lead_chatbot_db_api_ui.md §5–6.
 * `current_step` = bước user **đang trả lời**; `message` = nội dung trả lời.
 */

import {
  calculateLeadScore,
  classifyLead,
  getNextAction,
  scoreFromLeadPayload,
} from '@/lib/lead-scoring';

export type ChatStep =
  | 'start'
  | 'ask_name'
  | 'ask_industry'
  | 'ask_main_pain'
  | 'ask_business_size'
  | 'ask_budget'
  | 'ask_decision_role'
  | 'ask_urgency'
  | 'calculate_score'
  | 'recommend_action'
  | 'collect_contact'
  | 'book_demo'
  | 'done';

export type ChatState = {
  step: ChatStep;
  data: Record<string, string>;
};

const GREETING =
  'Chào anh/chị, em là Uyển Nhi — trợ lý AI của SABO. Em có thể giúp kiểm tra nhanh phần nào trong doanh nghiệp có thể tự động hóa. Cho em xin tên để xưng hô nhé?';

const Q: Partial<Record<ChatStep, string>> = {
  ask_industry: 'Anh/chị đang kinh doanh trong lĩnh vực nào? (retail, dịch vụ, bất động sản, giáo dục, F&B, agency…)',
  ask_main_pain: 'Phần nào đang “đau” nhất ạ? (một dòng)',
  ask_business_size: 'Quy mô khoảng bao nhiêu người? (solo / 2–5 / 6–20 / 20+)',
  ask_budget: 'Ngân sách dự kiến? (chưa rõ / <5M / 5–15M / 15–50M / 50M+)',
  ask_decision_role: 'Vai trò của anh/chị? (nhân viên / quản lý / founder)',
  ask_urgency: 'Độ cấp thiết? (đang tìm hiểu / quan tâm / muốn demo / cần gấp trong tháng)',
};

function norm(s: string | undefined): ChatStep {
  const alias: Record<string, ChatStep> = {
    identify_pain: 'ask_main_pain',
    ask_channel: 'collect_contact',
    calculate_score: 'recommend_action',
  };
  const v = (alias[s || ''] || s || 'start') as ChatStep;
  const ok = new Set<ChatStep>([
    'start',
    'ask_name',
    'ask_industry',
    'ask_main_pain',
    'ask_business_size',
    'ask_budget',
    'ask_decision_role',
    'ask_urgency',
    'calculate_score',
    'recommend_action',
    'collect_contact',
    'book_demo',
    'done',
  ]);
  return ok.has(v) ? v : 'start';
}

function fieldForStep(step: ChatStep): keyof ChatState['data'] | null {
  const m: Partial<Record<ChatStep, keyof ChatState['data']>> = {
    ask_name: 'full_name',
    ask_industry: 'industry',
    ask_main_pain: 'main_pain',
    ask_business_size: 'business_size',
    ask_budget: 'budget_range',
    ask_decision_role: 'decision_role',
    ask_urgency: 'urgency',
    collect_contact: 'raw_contact',
  };
  return m[step] ?? null;
}

export function advanceChatState(
  currentStep: string | undefined,
  message: string,
  prev: ChatState | null,
): { state: ChatState; reply: string; next_step: ChatStep; collected_data: Record<string, string> } {
  const step = norm(currentStep);
  const data: Record<string, string> = { ...(prev?.data || {}) };
  const f = fieldForStep(step);
  if (f && message.trim()) (data as Record<string, string>)[f] = message.trim();

  let next: ChatStep;
  let reply: string;

  switch (step) {
    case 'start':
      next = 'ask_name';
      reply = GREETING;
      break;
    case 'ask_name':
      next = 'ask_industry';
      reply = Q.ask_industry!;
      break;
    case 'ask_industry':
      next = 'ask_main_pain';
      reply = Q.ask_main_pain!;
      break;
    case 'ask_main_pain':
      next = 'ask_business_size';
      reply = Q.ask_business_size!;
      break;
    case 'ask_business_size':
      next = 'ask_budget';
      reply = Q.ask_budget!;
      break;
    case 'ask_budget':
      next = 'ask_decision_role';
      reply = Q.ask_decision_role!;
      break;
    case 'ask_decision_role':
      next = 'ask_urgency';
      reply = Q.ask_urgency!;
      break;
    case 'ask_urgency': {
      const input = scoreFromLeadPayload(data);
      const score = calculateLeadScore(input);
      const tier = classifyLead(score);
      const action = getNextAction(score);
      (data as Record<string, string>).computed_score = String(score);
      (data as Record<string, string>).computed_tier = tier;
      (data as Record<string, string>).computed_action = action;
      next = 'recommend_action';
      reply =
        tier === 'hot_lead'
          ? `Dựa trên thông tin, em đánh giá đây là case nên **demo trực tiếp** (điểm nội bộ ${score}/100). Phần này nên demo để tiết kiệm thời gian — anh/chị đặt lịch tại sabo.com.vn/booking hoặc để lại email/SĐT ở bước sau nhé.`
          : tier === 'warm_lead'
            ? `Em thấy tiềm năng automation khá rõ (điểm ${score}/100). Em đề xuất **audit 15 phút** — anh/chị muốn team gọi lại qua kênh nào (Zalo / email)?`
            : `Em gửi **checklist automation miễn phí** trước nhé (điểm ${score}/100). Anh/chị để email ở bước sau để em gửi file.`;
      break;
    }
    case 'recommend_action':
      next = 'collect_contact';
      reply =
        'Cho em **email + SĐT** (hoặc anh/chị submit nhanh tại sabo.com.vn/contact) để team SABO ghi nhận chính thức trong CRM nhé.';
      break;
    case 'collect_contact':
      next = 'done';
      reply =
        'Em đã ghi nhận. Team SABO sẽ liên hệ lại sớm. “Doanh nghiệp không thiếu người, chỉ thiếu hệ thống.”';
      break;
    default:
      next = 'done';
      reply = 'Cảm ơn anh/chị đã trao đổi với SABO.';
  }

  return { state: { step: next, data }, reply, next_step: next, collected_data: { ...data } };
}
