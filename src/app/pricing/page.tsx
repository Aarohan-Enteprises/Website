import type { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { GridBackground, FAQAccordion } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { pricingPlans, addOns, comparisonRows } from '@/data/pricing';
import { pricingFAQs } from '@/data/faq';
import { Check, Minus, Rocket, Zap, Building, AreaChart, Brain, Server, GraduationCap, Shield, RotateCcw, Headset, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing Plans - Automated Algorithmic Trading Development',
  description: 'Transparent pricing for automated algorithmic trading development services. Choose from starter, professional, or enterprise plans.',
  alternates: { canonical: 'https://pinecoder.in/pricing/' },
};

const planIcons: Record<string, React.ElementType> = {
  Starter: Rocket,
  Professional: Zap,
  Enterprise: Building,
};

const addOnIcons = [AreaChart, Brain, Server, GraduationCap];

export default function PricingPage() {
  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section className="relative pt-12 pb-8">
        <GridBackground opacity="opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your <span className="gradient-text">Plan</span>
            </h1>
            <p className="text-lg text-gray-400">
              Transparent pricing. No hidden fees. Start automating your trading today.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const Icon = planIcons[plan.name] || Rocket;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl overflow-hidden transition-all group ${
                    plan.popular
                      ? 'bg-gradient-to-b from-blue-600/10 to-slate-900 border-2 border-blue-500/50 lg:scale-105 shadow-xl shadow-blue-500/10'
                      : 'bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2 text-sm font-semibold">
                      <Star size={14} className="inline mr-1" /> MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${plan.popular ? 'bg-blue-600/20' : plan.name === 'Enterprise' ? 'bg-purple-600/20' : 'bg-slate-800'} rounded-xl flex items-center justify-center`}>
                        <Icon size={22} className={plan.iconColor} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>{plan.subtitle}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.priceLabel && <span className={plan.popular ? 'text-gray-400' : 'text-gray-500'}>{plan.priceLabel}</span>}
                      </div>
                      <p className={`text-sm mt-1 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                        {plan.price === 'Custom' ? 'Tailored to your needs' : 'One-time payment'}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <Check size={16} className={plan.popular ? 'text-green-400' : 'text-green-500'} />
                          <span className={plan.popular ? 'text-gray-200' : 'text-gray-300'}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.ctaLink}
                      className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-green-500" />
              <span>Milestone-based Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Headset size={16} className="text-green-500" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Compare Plans</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 px-4 text-left text-gray-400 font-medium text-sm">Feature</th>
                  <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm w-28">Starter</th>
                  <th className="py-4 px-4 text-center text-blue-400 font-medium text-sm w-28 bg-blue-600/5">Pro</th>
                  <th className="py-4 px-4 text-center text-gray-400 font-medium text-sm w-28">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i < comparisonRows.length - 1 ? 'border-b border-slate-800/50' : ''}>
                    <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check size={16} className="text-green-500 mx-auto" /> : <Minus size={16} className="text-gray-600 mx-auto" />
                      ) : row.starter}
                    </td>
                    <td className="py-4 px-4 text-center bg-blue-600/5">
                      {typeof row.professional === 'boolean' ? (
                        row.professional ? <Check size={16} className="text-green-500 mx-auto" /> : <Minus size={16} className="text-gray-600 mx-auto" />
                      ) : <span className="text-white">{row.professional}</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check size={16} className="text-green-500 mx-auto" /> : <Minus size={16} className="text-gray-600 mx-auto" />
                      ) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Add-ons & Extras</h2>
            <p className="text-gray-400">Enhance your trading system with additional features</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {addOns.map((addon, idx) => {
              const Icon = addOnIcons[idx] || AreaChart;
              return (
                <div key={addon.name} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                  <div className={`w-10 h-10 ${addon.iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={18} className={addon.iconColor} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{addon.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{addon.description}</p>
                  <p className="text-xl font-bold text-white">
                    {addon.price}
                    {addon.priceLabel && <span className="text-sm text-gray-500">{addon.priceLabel}</span>}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Common Questions</h2>
          <FAQAccordion items={pricingFAQs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to automate your trading?</h2>
            <p className="text-gray-400 mb-6">Get a free consultation and discuss your requirements</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Your Project <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/917499462967" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
