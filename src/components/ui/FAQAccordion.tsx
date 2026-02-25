'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/data/faq';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-800/50 transition-colors"
          >
            <span className="font-medium text-white">{item.question}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-5 text-gray-400 text-sm">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
