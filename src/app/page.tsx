import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { BackToTop, LiveTerminal } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import {
  ArrowRight, ArrowUpRight, Bot, Code2, Filter,
  Bell, BarChart3, Users, FileText, ShieldCheck, Check,
} from 'lucide-react';

const services = [
  {
    kicker: 'Automation',
    icon: Bot,
    title: 'Trading Bots',
    description:
      'Fully automated systems for stocks, F&O, and crypto — wired into Zerodha, Angel One, and more.',
    features: ['Multi-broker execution', 'Risk controls built in', 'Real-time monitoring'],
  },
  {
    kicker: 'Scripting',
    icon: Code2,
    title: 'Pine Script & Indicators',
    description:
      'Custom TradingView indicators, alerts, and strategies coded to your exact specification.',
    features: ['Custom indicators', 'Alert systems', 'Strategy scripts'],
  },
  {
    kicker: 'Screening',
    icon: Filter,
    title: 'Screener Dashboards',
    description:
      'Real-time stock screeners and dashboards tailored to the way you actually read the market.',
    features: ['Custom filters & scans', 'Real-time alerts', 'Multi-timeframe views'],
  },
];

const tools = [
  {
    icon: Bell,
    name: 'AlertSync',
    tag: 'Free & paid plans',
    href: 'https://alertsync.in',
    description: 'TradingView-to-Telegram relay. Alerts delivered in under 100ms, zero config.',
    features: ['Sub-100ms delivery', 'Zero-config webhooks', 'Full audit trail'],
  },
  {
    icon: BarChart3,
    name: 'Volatility Screener',
    tag: 'Free',
    href: 'https://vbc.pinecoder.in',
    description: 'Real-time crypto volatility screener built on Bollinger Bands & ATR analysis.',
    features: ['Live WebSocket data', 'Multi-timeframe scans', 'Breakout & squeeze alerts'],
  },
  {
    icon: Users,
    name: 'GroupSync',
    tag: 'Free scan · ₹50',
    href: 'https://groupsync.pinecoder.in',
    description:
      "Chrome extension that exports any WhatsApp group's member list to CSV, Excel, or vCard.",
    features: ['CSV, Excel & vCard', 'Unsaved numbers included', 'Nothing leaves your browser'],
  },
  {
    icon: FileText,
    name: 'PDF Editor',
    tag: 'Free · no signup',
    href: 'https://pdf2.in',
    description: 'Browser-based PDF tools — merge, split, rotate, compress, and convert.',
    features: ['Merge, split & rotate', 'Compress & watermark', 'PDF & DOCX conversion'],
  },
  {
    icon: ShieldCheck,
    name: 'Section63',
    tag: 'From ₹250 · no signup',
    href: 'https://section63.in',
    description:
      'Turns a WhatsApp chat export into a Section 63 (BSA 2023) certified exhibit for Indian courts.',
    features: ['s.63(4) certificate + SHA-256', 'Media hashed & reproduced', 'Read every page before you pay'],
  },
];

const steps = [
  {
    title: 'Tell us your strategy',
    description:
      'Share your trading logic. We assess feasibility and send back a detailed quote.',
    meta: ['Free consultation', 'NDA on request', '24-hour response'],
  },
  {
    title: 'We build & test',
    description:
      'Our team codes, backtests, and optimises your system until it holds up.',
    meta: ['Clean, documented code', 'Rigorous backtesting', 'Performance tuning'],
  },
  {
    title: 'Go live',
    description:
      'We deploy to your broker account. The system trades; you supervise.',
    meta: ['Broker integration', '24/7 execution', 'Ongoing support'],
  },
];

export default function HomePage() {
  return (
    <MainLayout simpleFooter>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="border-b border-ink">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 py-14 lg:py-20 items-center">
            {/* Headline */}
            <div className="lg:col-span-7 animate-fade-up">
              <p className="eyebrow mb-6">Trading systems · Built to order</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.02] tracking-tight text-ink">
                Smarter dashboards.
                <br />
                Better <span className="accent-ink">decisions.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-ink-soft leading-relaxed">
                We turn market noise into something you can act on. Custom trading
                dashboards that track P&amp;L, monitor positions, and execute faster —
                built around the way you trade.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link href="/assessment" className="btn-primary group">
                  Take the assessment
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="btn-ghost">
                  View pricing
                </Link>
              </div>
            </div>

            {/* Signature instrument — a live, rotating trading terminal */}
            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '0.12s' }}>
              <LiveTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ────────────────────────────────────────── */}
      <section className="border-b border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-rule text-center">
            {[
              ['2+ yrs', 'Building systems'],
              ['50+', 'Strategies shipped'],
              ['<100ms', 'Alert delivery'],
              ['24/7', 'Automated execution'],
            ].map(([value, label]) => (
              <div key={label} className="py-7 px-2">
                <dt className="font-display text-3xl text-ink">{value}</dt>
                <dd className="eyebrow text-ink-faint mt-2">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── What We Build ──────────────────────────────────────── */}
      <section id="services" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">What we build</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-ink">
            Three things, done properly.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            No off-the-shelf templates — every system is written for one trader&apos;s rules.
          </p>
        </header>

        <div className="grid md:grid-cols-3 border-t border-ink">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group border-b border-rule md:border-b-0 md:border-r md:last:border-r-0 border-ink/10 p-7 md:px-7 md:py-9 hover:bg-band/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow">{s.kicker}</span>
                  <Icon size={20} className="text-pine" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-3">{s.title}</h3>
                <p className="text-ink-soft mb-6">{s.description}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-mono text-xs text-ink-soft">
                      <Check size={13} className="text-pine" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/pricing" className="link-underline font-mono text-sm uppercase tracking-wider inline-flex items-center gap-2">
            See all services &amp; pricing <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Free Tools ─────────────────────────────────────────── */}
      <section id="tools" className="border-y border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <header className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">Our tools</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ink">
              Tools from our desk.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Software we built for our own workflow, opened up for yours.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-px bg-rule border border-rule">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <a
                  key={t.name}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface p-7 flex flex-col hover:bg-pine-tint transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon size={22} className="text-pine" strokeWidth={1.5} />
                    <ArrowUpRight size={18} className="text-ink-faint group-hover:text-pine transition-colors" />
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-2">
                    <h3 className="font-display text-xl text-ink">{t.name}</h3>
                    <span className="eyebrow text-ink-faint whitespace-nowrap">{t.tag}</span>
                  </div>
                  <p className="text-sm text-ink-soft mb-5">{t.description}</p>
                  <ul className="mt-auto space-y-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 font-mono text-xs text-ink-soft">
                        <Check size={13} className="text-pine" /> {f}
                      </li>
                    ))}
                  </ul>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works (a real sequence → numbered) ──────────── */}
      <section id="how-it-works" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">The process</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-ink">
            From idea to live in three steps.
          </h2>
        </header>

        <ol className="grid md:grid-cols-3 border-t border-ink">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="border-b border-rule md:border-b-0 md:border-r md:last:border-r-0 border-ink/10 p-7 md:px-7 md:py-9"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-5xl text-pine leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-ink-faint">/ 03</span>
              </div>
              <h3 className="font-display text-2xl text-ink mb-3">{step.title}</h3>
              <p className="text-ink-soft mb-6">{step.description}</p>
              <ul className="space-y-2">
                {step.meta.map((m) => (
                  <li key={m} className="flex items-center gap-2 font-mono text-xs text-ink-soft">
                    <ArrowRight size={12} className="text-pine" /> {m}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────── */}
      <section className="border-t border-ink bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="eyebrow text-paper/60 mb-5">Start the conversation</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper max-w-2xl mx-auto">
            Bring us your strategy. We&apos;ll bring the code.
          </h2>
          <p className="mt-5 text-paper/70 max-w-xl mx-auto">
            Free consultation, no obligations. Most projects start within a week.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-paper text-ink font-mono text-sm uppercase tracking-wider px-7 py-4 hover:bg-pine hover:text-paper transition-colors"
            >
              Start your project <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/917499462967"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-paper/40 text-paper font-mono text-sm uppercase tracking-wider px-7 py-4 hover:border-paper transition-colors"
            >
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <BackToTop />
    </MainLayout>
  );
}
