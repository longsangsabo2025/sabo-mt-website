'use client';

import { Plus, Minus } from 'lucide-react';
import useExpandPanel from '@/hooks/useExpandPanel';
import { EyebrowLabel } from './EyebrowLabel';

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export function ExpandPanel({
  eyebrow,
  title,
  description,
  children,
  defaultOpen = false,
}: Props) {
  const { open, toggle, contentRef } = useExpandPanel(defaultOpen);

  return (
    <div className="border-t border-rule py-6">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 text-left cursor-pointer"
      >
        <div className="flex-1">
          <EyebrowLabel>{eyebrow}</EyebrowLabel>
          <h3 className="text-h3 mt-2">{title}</h3>
          <p className="text-body-sm mt-2 text-paper/70 max-w-prose">
            {description}
          </p>
        </div>
        <span
          className="grid place-items-center w-10 h-10 rounded-full border border-rule shrink-0"
          aria-hidden="true"
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="pt-6 pb-2">{children}</div>
      </div>
    </div>
  );
}

export default ExpandPanel;
