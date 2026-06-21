'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '@/data/faq';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-rule">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={index} className="border-b border-rule">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-5 flex justify-between items-start gap-4 group"
              aria-expanded={open}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-ink-faint pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg text-ink group-hover:text-pine transition-colors">
                  {item.question}
                </span>
              </span>
              <span className="text-pine flex-shrink-0 mt-1">
                {open ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                open ? 'max-h-60' : 'max-h-0'
              }`}
            >
              <p className="pb-5 pl-8 pr-8 text-ink-soft leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
