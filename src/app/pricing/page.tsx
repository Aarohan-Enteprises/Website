import type { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { FAQAccordion } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { pricingPlans, comparisonRows } from '@/data/pricing';
import { pricingFAQs } from '@/data/faq';
import { Check, Minus, ArrowRight, Link2, Code2, Settings, Info, Shield, RotateCcw, Headset } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - Trading Automation & Pine Script Development',
  description: 'Transparent pricing for Pine Script development and broker integration services. Starting from ₹5,999. Actual quotation provided after understanding scope of work.',
  alternates: { canonical: 'https://pinecoder.in/pricing/' },
};

const planIcons: Record<string, React.ElementType> = {
  'Broker Integration': Link2,
  'Pine Script Development': Code2,
  'Custom Solution': Settings,
};

export default function PricingPage() {
  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section className="border-b border-ink">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 max-w-3xl">
          <p className="eyebrow mb-4">Rate card</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink">
            Honest, <span className="accent-ink">scoped</span> pricing.
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Starting rates for each service. We send an exact quote once we understand
            your scope — no surprises later.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-px bg-rule border border-ink">
          {pricingPlans.map((plan) => {
            const Icon = planIcons[plan.name] || Code2;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col p-8 ${plan.popular ? 'bg-pine-tint' : 'bg-surface'}`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-pine text-paper font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1">
                    Most chosen
                  </span>
                )}
                <div className="flex items-center justify-between mb-6">
                  <span className="eyebrow">{plan.subtitle}</span>
                  <Icon size={22} className="text-pine" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-2xl text-ink mb-4">{plan.name}</h3>

                <div className="mb-6 pb-6 border-b border-rule">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-4xl text-ink">{plan.price}</span>
                    {plan.priceLabel && (
                      <span className="font-mono text-xs text-ink-faint uppercase tracking-wider">{plan.priceLabel}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {plan.price === 'Custom' ? 'Tailored to your requirements' : 'Final price based on scope'}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-ink-soft">
                      <Check size={15} className="text-pine flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaLink}
                  className={`mt-auto text-center font-mono text-sm uppercase tracking-wider py-3.5 transition-colors ${
                    plan.popular
                      ? 'bg-pine text-paper hover:bg-pine-dark'
                      : 'border border-ink text-ink hover:bg-ink hover:text-paper'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="max-w-3xl mt-8 flex items-start gap-3 border-l-2 border-pine pl-4">
          <Info size={16} className="text-pine flex-shrink-0 mt-1" />
          <p className="text-sm text-ink-soft">
            Prices shown are starting estimates. Every project is unique — we provide an
            accurate quotation after understanding your specific requirements and scope of work.
          </p>
        </div>

        {/* Assurances */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mt-10 font-mono text-xs uppercase tracking-wider text-ink-soft">
          <span className="flex items-center gap-2"><Shield size={14} className="text-pine" /> Secure payments</span>
          <span className="flex items-center gap-2"><RotateCcw size={14} className="text-pine" /> Milestone-based</span>
          <span className="flex items-center gap-2"><Headset size={14} className="text-pine" /> Dedicated support</span>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-10">
            <p className="eyebrow mb-3">Side by side</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">Compare services</h2>
          </header>
          <div className="max-w-4xl overflow-x-auto">
            <table className="w-full text-sm border-t border-ink">
              <thead>
                <tr className="border-b border-ink">
                  <th className="py-4 pr-4 text-left eyebrow text-ink-soft">Feature</th>
                  <th className="py-4 px-4 text-center eyebrow text-ink-soft w-32">Broker</th>
                  <th className="py-4 px-4 text-center eyebrow text-pine w-32">Pine Script</th>
                  <th className="py-4 px-4 text-center eyebrow text-ink-soft w-32">Custom</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-rule">
                    <td className="py-4 pr-4 text-ink">{row.feature}</td>
                    <Cell value={row.starter} />
                    <Cell value={row.professional} highlight />
                    <Cell value={row.enterprise} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <header className="mb-10">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">Before you ask</h2>
        </header>
        <FAQAccordion items={pricingFAQs} />
      </section>

      {/* CTA */}
      <section className="border-t border-ink bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-paper">Ready to scope your build?</h2>
          <p className="mt-4 text-paper/70">Free consultation. We&apos;ll map out cost and timeline together.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-paper text-ink font-mono text-sm uppercase tracking-wider px-7 py-4 hover:bg-pine hover:text-paper transition-colors">
              Start your project <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/917499462967" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-paper/40 text-paper font-mono text-sm uppercase tracking-wider px-7 py-4 hover:border-paper transition-colors">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  return (
    <td className={`py-4 px-4 text-center ${highlight ? 'bg-pine-tint/60' : ''}`}>
      {typeof value === 'boolean' ? (
        value ? (
          <Check size={16} className="text-pine mx-auto" />
        ) : (
          <Minus size={16} className="text-ink-faint mx-auto" />
        )
      ) : (
        <span className={`font-mono text-xs ${highlight ? 'text-ink' : 'text-ink-soft'}`}>{value}</span>
      )}
    </td>
  );
}
