'use client';

import { useEffect, useState } from 'react';

// The signature device: a live market tape. Representative index quotes that
// drift on an interval and scroll continuously. Green/red appear here (and only
// here) because these are real market figures.

type Quote = {
  sym: string;
  base: number;   // reference (prev close) — % change is measured against this
  price: number;
  decimals: number;
};

const initialQuotes: Quote[] = [
  { sym: 'NIFTY 50', base: 24512.3, price: 24512.3, decimals: 2 },
  { sym: 'BANK NIFTY', base: 52840.15, price: 52840.15, decimals: 2 },
  { sym: 'SENSEX', base: 80604.65, price: 80604.65, decimals: 2 },
  { sym: 'FIN NIFTY', base: 23118.4, price: 23118.4, decimals: 2 },
  { sym: 'NIFTY IT', base: 37902.1, price: 37902.1, decimals: 2 },
  { sym: 'INDIA VIX', base: 13.27, price: 13.27, decimals: 2 },
  { sym: 'USD / INR', base: 83.41, price: 83.41, decimals: 2 },
  { sym: 'GOLD MCX', base: 71280, price: 71280, decimals: 0 },
];

function format(n: number, decimals: number) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function pct(q: Quote) {
  const change = ((q.price - q.base) / q.base) * 100;
  const sign = change >= 0 ? '+' : '−';
  return `${sign}${Math.abs(change).toFixed(2)}%`;
}

function Run({ quotes }: { quotes: Quote[] }) {
  return (
    <div className="ticker-track">
      {quotes.map((q) => {
        const up = q.price >= q.base;
        return (
          <span key={q.sym} className="inline-flex items-baseline gap-2 px-6">
            <span className="text-ink-soft">{q.sym}</span>
            <span className="text-ink tabular-nums">{format(q.price, q.decimals)}</span>
            <span className={up ? 'data-up' : 'data-down'}>{pct(q)}</span>
            <span className="text-rule-strong">/</span>
          </span>
        );
      })}
    </div>
  );
}

export function Ticker() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  useEffect(() => {
    // Respect reduced-motion: keep the tape static for those users.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setQuotes((prev) =>
        prev.map((q) => {
          // Small random step, gently mean-reverting, clamped to ±4% of base.
          const drift = (Math.random() - 0.5) * 0.0016;
          const revert = (q.base - q.price) / q.base * 0.05;
          let next = q.price * (1 + drift + revert);
          const lo = q.base * 0.96;
          const hi = q.base * 1.04;
          next = Math.min(hi, Math.max(lo, next));
          return { ...q, price: next };
        })
      );
    }, 1600);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-rule bg-band/60">
      <div className="ticker-mask overflow-hidden py-2 font-mono text-xs">
        <div className="ticker-marquee" aria-hidden="true">
          <Run quotes={quotes} />
          <Run quotes={quotes} />
        </div>
      </div>
    </div>
  );
}
