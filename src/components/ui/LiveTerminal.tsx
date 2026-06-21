'use client';

import { useEffect, useState } from 'react';

// The hero's signature instrument: a simulated trading terminal that rotates
// through three workspaces a real desk lives in — depth of market (bid/ask),
// the NIFTY option chain (open interest), and a portfolio risk cockpit.
// All numbers are simulated front-end (like the ticker); no live feed.
//
// Discipline: green/red appear only on prices (LTP) and P&L (scenario, drawdown).
// Open-interest bars use pine vs ink so red/green keep their market meaning.

const VIEWS = ['DOM', 'OI', 'RISK'] as const;

// Deterministic 0..1 noise so SSR and the first client render agree (tick = 0),
// then it animates as `tick` increments on the client.
function noise(a: number, b: number) {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const inr = (n: number, d = 2) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ── Order book ─────────────────────────────────────────────── */
const ASKS = [
  { price: 24519, size: 2100 },
  { price: 24518, size: 740 },
  { price: 24517, size: 410 },
  { price: 24515, size: 980 },
];
const BIDS = [
  { price: 24514, size: 680 },
  { price: 24512, size: 1320 },
  { price: 24511, size: 1980 },
  { price: 24510, size: 2540 },
];

function OrderBook({ tick }: { tick: number }) {
  const size = (base: number, i: number) => Math.round(base * (0.6 + noise(tick + i, 3) * 0.8));
  const ask = ASKS.map((r, i) => ({ ...r, size: size(r.size, i) }));
  const bid = BIDS.map((r, i) => ({ ...r, size: size(r.size, i + 10) }));
  const denom = 2800;
  const ltpUp = noise(tick, 7) > 0.5;
  const ltp = 24514 + noise(tick, 9) * 1.5;

  const Row = ({ price, sz, side }: { price: number; sz: number; side: 'ask' | 'bid' }) => (
    <div className="relative flex items-center justify-between px-2 py-[3px]">
      <div
        className={`absolute inset-y-0 right-0 ${side === 'ask' ? 'bg-down/10' : 'bg-up/10'}`}
        style={{ width: `${Math.min(100, (sz / denom) * 100)}%` }}
      />
      <span className={`relative font-mono text-xs ${side === 'ask' ? 'data-down' : 'data-up'}`}>
        {inr(price, 2)}
      </span>
      <span className="relative font-mono text-[0.7rem] text-ink-soft">{sz.toLocaleString('en-IN')}</span>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="eyebrow text-ink-faint">Order Book · NIFTY FUT</span>
        <span className="font-mono text-[0.7rem] text-ink-faint">Qty</span>
      </div>
      {ask.map((r) => <Row key={r.price} price={r.price} sz={r.size} side="ask" />)}
      <div className="flex items-center justify-between border-y border-rule my-1 px-2 py-1.5">
        <span className="eyebrow text-ink-faint">Spread 1.00</span>
        <span className={`font-mono text-sm ${ltpUp ? 'data-up' : 'data-down'}`}>
          LTP {inr(ltp, 2)} {ltpUp ? '▲' : '▼'}
        </span>
      </div>
      {bid.map((r) => <Row key={r.price} price={r.price} sz={r.size} side="bid" />)}
    </div>
  );
}

/* ── Option chain (open interest) ───────────────────────────── */
const CHAIN = [
  { strike: 24300, call: 38, put: 25 },
  { strike: 24400, call: 52, put: 41 },
  { strike: 24500, call: 61, put: 70, spot: true },
  { strike: 24600, call: 44, put: 55 },
  { strike: 24700, call: 22, put: 30 },
];

function OptionChain({ tick }: { tick: number }) {
  const rows = CHAIN.map((r, i) => ({
    ...r,
    call: r.call * (0.8 + noise(tick + i, 1) * 0.4),
    put: r.put * (0.8 + noise(tick + i, 2) * 0.4),
  }));
  const totCall = rows.reduce((s, r) => s + r.call, 0);
  const totPut = rows.reduce((s, r) => s + r.put, 0);
  const pcr = (totPut / totCall).toFixed(2);
  const denom = 80;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="eyebrow text-ink-faint">NIFTY Options · OI</span>
        <span className="font-mono text-[0.7rem] text-ink-soft">PCR <span className="text-pine">{pcr}</span></span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-2 eyebrow text-ink-faint">
        <span className="text-right">Call OI</span>
        <span className="text-center w-14">Strike</span>
        <span>Put OI</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.strike} className={`grid grid-cols-[1fr_auto_1fr] gap-2 items-center ${r.spot ? 'bg-pine-tint -mx-2 px-2 py-1' : ''}`}>
            <div className="flex justify-end">
              <div className="h-2.5 bg-ink/35" style={{ width: `${Math.min(100, (r.call / denom) * 100)}%` }} />
            </div>
            <span className="font-mono text-[0.7rem] text-ink text-center w-14">{r.strike}</span>
            <div className="flex justify-start">
              <div className="h-2.5 bg-pine/55" style={{ width: `${Math.min(100, (r.put / denom) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-rule eyebrow text-ink-faint">
        <span>Max Pain 24,500</span>
        <span>Spot {inr(24514 + noise(tick, 4), 2)}</span>
      </div>
    </div>
  );
}

/* ── Risk cockpit ───────────────────────────────────────────── */
const SCENARIO = [
  { h: '+1D', cells: [-32, -11, 3, 14, 28] },
  { h: '+1W', cells: [-58, -19, 6, 26, 52] },
];
const MOVES = ['−5%', '−2%', '0', '+2%', '+5%'];

function Risk({ tick }: { tick: number }) {
  const j = (n: number, i: number) => n * (0.85 + noise(tick + i, 5) * 0.3);
  const greeks = [
    ['Δ', (0.62 + noise(tick, 1) * 0.06).toFixed(2)],
    ['Γ', (0.08).toFixed(2)],
    ['Θ', `−${Math.round(j(1240, 2)).toLocaleString('en-IN')}`],
    ['ν', Math.round(j(3510, 3)).toLocaleString('en-IN')],
  ];
  const cell = (v: number) => {
    const up = v >= 0;
    const op = Math.min(0.8, Math.abs(v) / 60 + 0.1);
    return up
      ? { backgroundColor: `rgba(27,122,75,${op})` }
      : { backgroundColor: `rgba(190,58,40,${op})` };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="eyebrow text-ink-faint">Risk · Portfolio</span>
        <span className="font-mono text-[0.7rem] text-ink-soft">VaR <span className="text-ink">₹{(48.2 + noise(tick, 8)).toFixed(1)}k</span></span>
      </div>

      <div className="grid grid-cols-4 border border-rule divide-x divide-rule mb-4">
        {greeks.map(([k, v]) => (
          <div key={k} className="px-2 py-2 text-center">
            <div className="eyebrow text-ink-faint">{k}</div>
            <div className="font-mono text-xs text-ink mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="eyebrow text-ink-faint mb-2">Scenario · P&amp;L by NIFTY move</div>
      <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1 items-center">
        <span />
        {MOVES.map((m) => <span key={m} className="font-mono text-[0.6rem] text-ink-faint text-center">{m}</span>)}
        {SCENARIO.map((row) => (
          <FragmentRow key={row.h} h={row.h} cells={row.cells} j={j} cell={cell} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-2 border-t border-rule font-mono text-[0.7rem] text-ink-soft">
        <span>BETA 0.94</span>
        <span>SHARPE 1.7</span>
        <span>DD <span className="data-down">−6.2%</span></span>
      </div>
    </div>
  );
}

function FragmentRow({
  h, cells, j, cell,
}: {
  h: string;
  cells: number[];
  j: (n: number, i: number) => number;
  cell: (v: number) => React.CSSProperties;
}) {
  return (
    <>
      <span className="font-mono text-[0.6rem] text-ink-faint pr-1">{h}</span>
      {cells.map((c, i) => {
        const v = c >= 0 ? j(c, i) : -j(-c, i);
        return <div key={i} className="h-6" style={cell(v)} title={`${Math.round(v)}k`} />;
      })}
    </>
  );
}

/* ── Shell ──────────────────────────────────────────────────── */
export function LiveTerminal() {
  const [view, setView] = useState(0);
  const [tick, setTick] = useState(0);
  const [clock, setClock] = useState('09:15:00');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const rot = setInterval(() => setView((v) => (v + 1) % 3), 6000);
    const t = setInterval(() => setTick((x) => x + 1), 1500);
    const clk = setInterval(
      () => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false })),
      1000,
    );
    return () => { clearInterval(rot); clearInterval(t); clearInterval(clk); };
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-rule">
        <span className="eyebrow text-ink flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-up inline-block animate-pulse" />
          Live Terminal
        </span>
        <span className="font-mono text-[0.65rem] text-ink-faint tabular-nums">{clock} IST</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-rule">
        {VIEWS.map((v, i) => (
          <button
            key={v}
            onClick={() => setView(i)}
            className={`flex-1 py-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] border-r border-rule last:border-r-0 transition-colors ${
              view === i ? 'bg-pine text-paper' : 'text-ink-faint hover:text-ink'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Rotating body — fixed height so the hero doesn't jump on switch */}
      <div className="relative h-[300px]">
        {[OrderBook, OptionChain, Risk].map((View, i) => (
          <div
            key={i}
            className={`absolute inset-0 p-4 transition-opacity duration-500 ${
              view === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <View tick={tick} />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-rule px-4 py-2">
        <span className="font-mono text-[0.6rem] text-ink-faint">
          Simulated preview · the kind of dashboard we build for you
        </span>
      </div>
    </div>
  );
}
