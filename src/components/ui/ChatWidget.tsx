'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X, ArrowUp, Sparkles, ExternalLink, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/cn';
import { detectLeadIntent } from '@/lib/chat-context';
import { useExitIntent } from '@/hooks/useExitIntent';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'SABO làm gì?',
  'Chi phí phát triển web app?',
  'Tự động hóa quy trình',
  'Sản xuất video bằng AI',
];

const WELCOME =
  'Xin chào! Tôi là trợ lý SABO M&T. Tôi có thể tư vấn về Build, Automate, Create services. Bạn cần hỗ trợ gì?';

type ChatMode = 'free' | 'qualify';

const QUALIFY_LEAD_KEY = 'sabo-qualify-lead-id';
const QUALIFY_STEP_KEY = 'sabo-qualify-next-step';
const QUALIFY_MSGS_KEY = 'sabo-qualify-msgs';

function stripMd(s: string) {
  return s.replace(/\*\*/g, '');
}

// LocalStorage keys
const STORAGE_KEY = 'sabo-chat-messages';
const EXIT_INTENT_KEY = 'sabo-exit-intent-triggered';
const MAX_STORED_MESSAGES = 20;

export function ChatWidget() {
  const pathname = usePathname();
  const en = Boolean(pathname?.startsWith('/en'));

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('free');
  const [messages, setMessages] = useState<Message[]>([]);
  const [qualifyMessages, setQualifyMessages] = useState<Message[]>([]);
  const [qualifyLeadId, setQualifyLeadId] = useState<string | null>(null);
  const [qualifyStep, setQualifyStep] = useState<string>('start');
  const [qualifyLoading, setQualifyLoading] = useState(false);
  const [qualifyError, setQualifyError] = useState<string | null>(null);
  const [demoSlot, setDemoSlot] = useState('');
  const [demoBusy, setDemoBusy] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState('');
  const [showContactCTA, setShowContactCTA] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if exit intent already fired this session
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(EXIT_INTENT_KEY);
      if (stored === 'true') setExitIntentTriggered(true);
    } catch { /* ignore */ }
  }, []);

  useExitIntent({
    activationDelay: 30000,
    triggered: exitIntentTriggered,
    onExitIntent: () => {
      setExitIntentTriggered(true);
      setOpen(true);
      try { sessionStorage.setItem(EXIT_INTENT_KEY, 'true'); } catch { /* ignore */ }
    },
  });

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.slice(-MAX_STORED_MESSAGES));
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
        );
      } catch {
        // ignore quota errors
      }
    }
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming, qualifyMessages, mode]);

  // Default demo slot when survey completes (tomorrow 10:00 local)
  useEffect(() => {
    if (qualifyStep !== 'done') return;
    setDemoSlot((prev) => {
      if (prev) return prev;
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(10, 0, 0, 0);
      const p = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
    });
  }, [qualifyStep]);

  // Resume qualify flow from sessionStorage (same tab)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(QUALIFY_MSGS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Message[];
      if (!Array.isArray(p) || p.length === 0) return;
      setQualifyMessages(p);
      const lid = sessionStorage.getItem(QUALIFY_LEAD_KEY);
      if (lid) setQualifyLeadId(lid);
      const st = sessionStorage.getItem(QUALIFY_STEP_KEY);
      if (st) setQualifyStep(st);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (qualifyMessages.length === 0) return;
    try {
      sessionStorage.setItem(QUALIFY_MSGS_KEY, JSON.stringify(qualifyMessages.slice(-40)));
      if (qualifyLeadId) sessionStorage.setItem(QUALIFY_LEAD_KEY, qualifyLeadId);
      sessionStorage.setItem(QUALIFY_STEP_KEY, qualifyStep);
    } catch {
      // ignore
    }
  }, [qualifyMessages, qualifyLeadId, qualifyStep]);

  const resetQualify = useCallback(() => {
    try {
      sessionStorage.removeItem(QUALIFY_LEAD_KEY);
      sessionStorage.removeItem(QUALIFY_STEP_KEY);
      sessionStorage.removeItem(QUALIFY_MSGS_KEY);
    } catch {
      // ignore
    }
    setQualifyLeadId(null);
    setQualifyStep('start');
    setQualifyMessages([]);
    setQualifyError(null);
    setDemoSlot('');
    setDemoNotice(null);
    setDemoBusy(false);
  }, []);

  const startQualifySurvey = useCallback(async () => {
    setQualifyLoading(true);
    setQualifyError(null);
    try {
      let leadId = qualifyLeadId;
      if (!leadId) {
        const s = await fetch('/api/chat/session', { method: 'POST' });
        if (s.status === 503) {
          setQualifyError(
            en ? 'Survey unavailable (server not configured).' : 'Khảo sát chưa bật trên máy chủ.',
          );
          return;
        }
        if (!s.ok) {
          const j = (await s.json().catch(() => ({}))) as { error?: string };
          setQualifyError(j.error ?? 'session_failed');
          return;
        }
        const { lead_id } = (await s.json()) as { lead_id: string };
        leadId = lead_id;
        setQualifyLeadId(leadId);
      }

      const m = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          current_step: 'start',
          message: 'Bắt đầu',
          session_id: 'widget',
        }),
      });
      const j = (await m.json().catch(() => ({}))) as {
        reply?: string;
        next_step?: string;
        error?: string;
      };
      if (!m.ok) {
        setQualifyError(j.error ?? 'message_failed');
        return;
      }
      setQualifyMessages([{ role: 'assistant', content: stripMd(j.reply || '') }]);
      setQualifyStep(j.next_step || 'ask_name');
    } catch {
      setQualifyError(en ? 'Network error.' : 'Lỗi mạng, thử lại.');
    } finally {
      setQualifyLoading(false);
    }
  }, [en, qualifyLeadId]);

  const sendQualify = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || qualifyLoading || !qualifyLeadId) return;
      setQualifyMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      setInput('');
      setQualifyLoading(true);
      setQualifyError(null);
      try {
        const m = await fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            lead_id: qualifyLeadId,
            current_step: qualifyStep,
            message: trimmed,
            session_id: 'widget',
          }),
        });
        const j = (await m.json().catch(() => ({}))) as {
          reply?: string;
          next_step?: string;
          error?: string;
        };
        if (!m.ok) {
          setQualifyMessages((prev) => prev.slice(0, -1));
          setQualifyError(j.error ?? 'message_failed');
          return;
        }
        setQualifyMessages((prev) => [
          ...prev,
          { role: 'assistant', content: stripMd(j.reply || '') },
        ]);
        setQualifyStep(j.next_step ?? 'done');
      } catch {
        setQualifyMessages((prev) => prev.slice(0, -1));
        setQualifyError(en ? 'Network error.' : 'Lỗi mạng, thử lại.');
      } finally {
        setQualifyLoading(false);
      }
    },
    [en, qualifyLeadId, qualifyLoading, qualifyStep],
  );

  const submitDemoSlot = useCallback(async () => {
    if (!qualifyLeadId || !demoSlot.trim()) return;
    const iso = new Date(demoSlot).toISOString();
    if (Number.isNaN(Date.parse(iso))) {
      setDemoNotice(en ? 'Invalid date/time.' : 'Ngày giờ không hợp lệ.');
      return;
    }
    setDemoBusy(true);
    setDemoNotice(null);
    try {
      const r = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          lead_id: qualifyLeadId,
          booking_time: iso,
          meeting_channel: 'widget',
        }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string; booking_id?: string };
      if (!r.ok) {
        setDemoNotice(j.error ?? (en ? 'Booking failed.' : 'Đặt lịch thất bại.'));
        return;
      }
      setDemoNotice(
        en
          ? 'Demo slot saved. Our team will confirm shortly.'
          : 'Đã lưu lịch demo. Team sẽ xác nhận sớm.',
      );
    } catch {
      setDemoNotice(en ? 'Network error.' : 'Lỗi mạng.');
    } finally {
      setDemoBusy(false);
    }
  }, [en, qualifyLeadId, demoSlot]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (mode === 'qualify') {
        await sendQualify(trimmed);
        return;
      }
      if (!trimmed || loading) return;

      // Check for lead intent in user message
      const hasIntent = detectLeadIntent(trimmed);
      if (hasIntent && !showContactCTA) {
        setShowContactCTA(true);
      }

      const next: Message[] = [...messages, { role: 'user', content: trimmed }];
      setMessages(next);
      setInput('');
      setLoading(true);
      setStreaming('');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: next }),
        });

        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          const errorMsg =
            j.error ?? 'Trợ lý đang bận, vui lòng dùng form contact tại /contact';
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: errorMsg },
          ]);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('no reader');

        const decoder = new TextDecoder();
        let accumulated = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Keep the last (possibly incomplete) line in the buffer
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                accumulated += delta;
                setStreaming(accumulated);
              }
            } catch {
              // ignore malformed SSE chunk
            }
          }
        }

        const finalContent = accumulated || 'Không nhận được phản hồi.';
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: finalContent },
        ]);

        // Check assistant response for CTA trigger (fallback detection)
        if (!showContactCTA && detectLeadIntent(finalContent)) {
          setShowContactCTA(true);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Trợ lý đang bận, vui lòng dùng form contact tại /contact',
          },
        ]);
      } finally {
        setLoading(false);
        setStreaming('');
      }
    },
    [messages, loading, showContactCTA, mode, sendQualify],
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="AI tư vấn SABO"
        aria-modal="true"
        className={cn(
          'fixed bottom-20 right-4 md:right-8 z-50',
          'w-[calc(100vw-2rem)] md:w-[400px]',
          'bg-[#0a0a0a] border border-white/[0.08]',
          'flex flex-col overflow-hidden',
          'shadow-[0_32px_80px_rgba(0,0,0,0.8)]',
          'transition-all duration-500 ease-expo origin-bottom-right',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none',
        )}
        style={{ height: '560px' }}
      >
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* AI Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center">
                <span className="font-serif text-[15px] text-paper leading-none">S</span>
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-paper tracking-[0.2em] uppercase leading-none">
                {mode === 'qualify'
                  ? en
                    ? 'Uyển Nhi · lead survey'
                    : 'Uyển Nhi · khảo sát lead'
                  : en
                    ? 'SABO assistant 24/7'
                    : 'Trợ lý SABO 24/7'}
              </span>
              <span className="font-sans text-[10px] text-paper/30 leading-none">
                {en
                  ? 'Instant · Build · Automate · Create'
                  : 'Tư vấn tức thì · Build · Automate · Create'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center text-paper/30 hover:text-paper hover:bg-white/[0.06] rounded-full transition-all"
            aria-label="Đóng chat"
          >
            <X size={14} />
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-1 px-3 py-2 border-b border-white/[0.07]">
          <button
            type="button"
            onClick={() => setMode('free')}
            className={cn(
              'flex-1 font-mono text-[9px] tracking-[0.12em] uppercase py-2 rounded-sm transition-colors',
              mode === 'free'
                ? 'bg-white/[0.08] text-paper border border-white/15'
                : 'text-paper/35 border border-transparent hover:text-paper/55',
            )}
          >
            {en ? 'Ask AI' : 'Hỏi AI'}
          </button>
          <button
            type="button"
            onClick={() => setMode('qualify')}
            className={cn(
              'flex-1 font-mono text-[9px] tracking-[0.12em] uppercase py-2 rounded-sm transition-colors inline-flex items-center justify-center gap-1',
              mode === 'qualify'
                ? 'bg-white/[0.08] text-paper border border-white/15'
                : 'text-paper/35 border border-transparent hover:text-paper/55',
            )}
          >
            <ClipboardList size={10} className="opacity-60" />
            {en ? 'Survey' : 'Khảo sát'}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 min-h-0
          [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent]">

          {mode === 'free' && (
          <div className="flex gap-2.5 items-start">
            <div className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-serif text-[10px] text-paper/70 leading-none">S</span>
            </div>
            <p className="text-paper/65 text-body-sm font-sans leading-relaxed flex-1">{WELCOME}</p>
          </div>
          )}

          {mode === 'qualify' && qualifyMessages.length === 0 && !qualifyLoading && (
            <div className="space-y-3 pl-1">
              <p className="text-paper/60 text-body-sm font-sans leading-relaxed">
                {en
                  ? '2-minute survey: industry, pain points, and contact — saved to our CRM.'
                  : 'Khảo sát ~2 phút: ngành, pain, liên hệ — lưu vào CRM SABO.'}
              </p>
              <button
                type="button"
                onClick={startQualifySurvey}
                className="font-mono text-[10px] tracking-[0.15em] uppercase border border-white/20
                  hover:border-white/40 text-paper/80 px-4 py-2.5 w-full transition-colors"
              >
                {en ? 'Start' : 'Bắt đầu'}
              </button>
            </div>
          )}

          {/* Suggestions — only when empty */}
          {mode === 'free' && messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pl-[34px]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={loading}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase text-paper/45
                    border border-white/[0.12] hover:border-white/30 hover:text-paper/80
                    px-3 py-1.5 transition-all duration-200 disabled:opacity-25"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {qualifyError && (
            <p className="text-red-400/90 text-body-sm font-sans pl-1">{qualifyError}</p>
          )}

          {mode === 'qualify' && qualifyMessages.length > 0 && (
            <div className="flex justify-end pl-1">
              <button
                type="button"
                onClick={resetQualify}
                className="font-mono text-[9px] tracking-[0.1em] uppercase text-paper/35 hover:text-paper/60"
              >
                {en ? 'Restart survey' : 'Làm lại khảo sát'}
              </button>
            </div>
          )}

          {/* Conversation */}
          {(mode === 'qualify' ? qualifyMessages : messages).map((m, i) =>
            m.role === 'user' ? (
              /* User bubble */
              <div key={i} className="flex justify-end gap-2 items-end">
                <div className="bg-paper text-ink px-4 py-2.5 text-body-sm font-sans
                  max-w-[78%] leading-snug rounded-sm">
                  {m.content}
                </div>
                {/* User dot */}
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15
                  flex items-center justify-center shrink-0">
                  <span className="font-mono text-[8px] text-paper/50 leading-none">U</span>
                </div>
              </div>
            ) : (
              /* AI bubble */
              <div key={i} className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.04]
                  flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-serif text-[10px] text-paper/70 leading-none">S</span>
                </div>
                <span className="text-paper/75 text-body-sm font-sans flex-1 leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </span>
              </div>
            ),
          )}

          {/* Streaming */}
          {streaming && (
            <div className="flex gap-2.5 items-start">
              <div className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.04]
                flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-serif text-[10px] text-paper/70 leading-none">S</span>
              </div>
              <span className="text-paper/75 text-body-sm font-sans flex-1 leading-relaxed whitespace-pre-wrap">
                {streaming}
              </span>
            </div>
          )}

          {/* Typing indicator (qualify) */}
          {mode === 'qualify' && qualifyLoading && (
            <div className="flex gap-2.5 items-start">
              <div className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.04]
                flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-serif text-[10px] text-paper/70 leading-none">N</span>
              </div>
              <div className="flex gap-1 items-center pt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {mode === 'free' && loading && !streaming && (
            <div className="flex gap-2.5 items-start">
              <div className="w-6 h-6 rounded-full border border-white/15 bg-white/[0.04]
                flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-serif text-[10px] text-paper/70 leading-none">S</span>
              </div>
              <div className="flex gap-1 items-center pt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-paper/35 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {mode === 'qualify' && qualifyStep === 'done' && qualifyLeadId && (
            <div className="pl-[34px] space-y-3">
              <p className="text-paper/50 text-[11px] font-mono uppercase tracking-wider">
                {en ? 'Next step' : 'Bước tiếp'}
              </p>
              <div className="space-y-2 border border-white/10 bg-white/[0.02] px-3 py-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-paper/40">
                  {en ? 'Quick demo slot (CRM)' : 'Đặt slot demo nhanh (CRM)'}
                </p>
                <input
                  type="datetime-local"
                  value={demoSlot}
                  onChange={(e) => setDemoSlot(e.target.value)}
                  disabled={demoBusy}
                  className="w-full bg-black/40 border border-white/15 text-paper/90 text-body-sm font-sans px-2 py-2
                    [color-scheme:dark] disabled:opacity-40"
                />
                <button
                  type="button"
                  onClick={submitDemoSlot}
                  disabled={demoBusy || !demoSlot}
                  className="w-full font-mono text-[9px] tracking-[0.12em] uppercase border border-white/20
                    py-2 text-paper/85 hover:border-white/40 disabled:opacity-30 transition-colors"
                >
                  {demoBusy
                    ? en
                      ? 'Saving…'
                      : 'Đang lưu…'
                    : en
                      ? 'Save demo time'
                      : 'Lưu lịch demo'}
                </button>
                {demoNotice && (
                  <p className="text-body-sm text-paper/70 font-sans">{demoNotice}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="/booking"
                  className="text-body-sm text-paper/80 border border-white/15 px-3 py-2 hover:border-white/30 transition-colors"
                >
                  {en ? 'Book a call →' : 'Đặt lịch tư vấn →'}
                </a>
                <a
                  href={en ? '/en/contact' : '/contact'}
                  className="text-body-sm text-paper/55 border border-white/10 px-3 py-2 hover:border-white/25 transition-colors"
                >
                  {en ? 'Contact form →' : 'Form liên hệ →'}
                </a>
              </div>
            </div>
          )}

          {/* Contact CTA card — show when lead intent detected */}
          {mode === 'free' && showContactCTA && (
            <div className="pl-[34px]">
              <a
                href={en ? '/en/contact' : '/contact'}
                className="block border border-white/[0.15] hover:border-white/30
                  bg-white/[0.02] hover:bg-white/[0.04]
                  px-4 py-3 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/45 mb-1">
                      SẴN SÀNG BẮT ĐẦU?
                    </p>
                    <p className="text-body-sm text-paper/75 font-sans leading-snug">
                      Gửi yêu cầu chính thức để team SABO tư vấn chi tiết 1-1
                    </p>
                  </div>
                  <ExternalLink size={14} className="text-paper/30 group-hover:text-paper/60 shrink-0 transition-colors" />
                </div>
              </a>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 border-t border-white/[0.07] flex items-center gap-2 px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={
              mode === 'qualify'
                ? en
                  ? 'Your answer…'
                  : 'Trả lời theo gợi ý phía trên…'
                : en
                  ? 'Ask anything…'
                  : 'Nhập câu hỏi của bạn…'
            }
            disabled={loading || qualifyLoading || (mode === 'qualify' && qualifyMessages.length === 0)}
            maxLength={mode === 'qualify' ? 4000 : 500}
            className="flex-1 bg-transparent text-body-sm text-paper
              placeholder-paper/20 outline-none font-sans py-1"
          />
          <button
            onClick={() => send(input)}
            disabled={
              (mode === 'free' && loading) ||
              (mode === 'qualify' && qualifyLoading) ||
              !input.trim() ||
              (mode === 'qualify' && qualifyMessages.length === 0)
            }
            aria-label="Gửi"
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              'transition-all duration-200',
              input.trim() && !loading
                ? 'bg-paper text-ink hover:bg-paper/90'
                : 'bg-white/[0.06] text-paper/25',
            )}
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent flex-shrink-0" />
      </div>

      {/* FAB toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng chat AI' : 'Mở chat AI'}
        aria-expanded={open}
        className={cn(
          'fixed bottom-4 right-4 md:right-8 z-50',
          'flex items-center gap-2',
          'font-mono text-[10px] tracking-[0.18em] uppercase',
          'px-4 py-2.5 rounded-full',
          'transition-all duration-300 ease-expo',
          'shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
          open
            ? 'bg-white/[0.06] text-paper/60 border border-white/10 hover:text-paper'
            : 'bg-paper text-ink hover:bg-paper/90',
        )}
      >
        <Sparkles size={11} />
        {open ? 'Đóng' : 'Chat AI'}
      </button>
    </>
  );
}
