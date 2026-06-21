import type { Metadata } from 'next';
import { MainLayout } from '@/components/layouts';
import { Users, Award, Cloud, Code, Shield, TrendingUp, Handshake, Lightbulb, Check, ArrowRight } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { stats, certifications, coreValues, whyChooseUs, founder } from '@/data/about';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Automated Algorithmic Trading Experts',
  description: "Learn about Aarohan Enterprises - India's leading automated algorithmic trading development company. Meet our team of experts who transform trading ideas into profitable algorithms.",
  alternates: { canonical: 'https://pinecoder.in/about/' },
  openGraph: {
    title: 'About Us - Aarohan Enterprises | Automated Algorithmic Trading Experts',
    description: "Learn about Aarohan Enterprises - India's leading automated algorithmic trading development company.",
    images: ['https://pinecoder.in/og-image.jpg'],
  },
};

const iconMap: Record<string, React.ElementType> = {
  Shield, TrendingUp, Handshake, Lightbulb, Award, Cloud, Code,
};

export default function AboutPage() {
  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section className="border-b border-ink">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 max-w-3xl">
          <p className="eyebrow mb-4 flex items-center gap-2"><Users size={13} /> The team behind Aarohan Enterprises</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink">
            We code. <span className="accent-ink">You trade.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            We&apos;re software engineers on a mission to make algorithmic trading accessible to
            everyone in India — turning a documented strategy into a system that runs itself.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-rule text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="py-7 px-2">
                <dt className="font-display text-3xl text-ink">{stat.value}</dt>
                <dd className="eyebrow text-ink-faint mt-2">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl">
          <div>
            <p className="eyebrow mb-4">Our story</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ink mb-6">
              Built by engineers, for traders.
            </h2>
            <div className="space-y-4 text-ink-soft leading-relaxed">
              <p>Aarohan Enterprises was born from a simple observation: talented traders across India had profitable strategies but lacked the technical expertise to automate them.</p>
              <p>Built by software engineers with hands-on experience in algorithmic platforms and real-time market data systems, we bring institutional-grade technology to retail traders.</p>
              <p>Today, we&apos;re the trusted partner for traders looking to automate their edge — from Pine Script indicators to full-stack trading bots.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {certifications.map((cert) => {
                const IconComp = iconMap[cert.icon] || Code;
                return (
                  <span key={cert.label} className="inline-flex items-center gap-2 border border-rule px-3 py-2 font-mono text-xs text-ink-soft">
                    <IconComp size={14} className="text-pine" /> {cert.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Code tear sheet */}
          <div className="card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-rule">
              <span className="w-2.5 h-2.5 rounded-full border border-rule-strong" />
              <span className="w-2.5 h-2.5 rounded-full border border-rule-strong" />
              <span className="w-2.5 h-2.5 rounded-full border border-rule-strong" />
              <span className="eyebrow text-ink-faint ml-2">strategy.pine</span>
            </div>
            <pre className="p-5 font-mono text-xs leading-relaxed text-ink-soft overflow-x-auto">
              <code>
                <span className="text-ink-faint">{'//@version=5'}</span>{'\n'}
                <span className="text-pine">strategy</span>(<span className="text-ink">&quot;Aarohan Strategy&quot;</span>){'\n'}
                <span className="text-ink-faint">{'// your edge, automated'}</span>{'\n'}
                <span className="text-pine">if</span> buyCondition{'\n'}
                {'    '}<span className="text-ink">strategy.entry</span>(<span className="text-ink">&quot;Long&quot;</span>){'\n'}
              </code>
            </pre>
            <div className="border-t border-rule px-5 py-3 flex items-center justify-between">
              <span className="eyebrow text-ink-faint">In production</span>
              <span className="font-mono text-sm text-pine">2+ years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule max-w-4xl">
            <div className="bg-surface p-8">
              <p className="eyebrow mb-4">Mission</p>
              <p className="font-display text-xl text-ink leading-snug">
                Democratise algorithmic trading — making it accessible, affordable, and
                profitable for every trader in India. Technology should empower traders,
                not complicate their journey.
              </p>
            </div>
            <div className="bg-surface p-8">
              <p className="eyebrow mb-4">Vision</p>
              <p className="font-display text-xl text-ink leading-snug">
                Become India&apos;s most trusted algorithmic trading partner — setting new
                standards in strategy development, risk management, and automated execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="eyebrow mb-4">Meet the founder</p>
        <div className="card max-w-3xl">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-rule">
              <Image src={founder.image} alt={founder.name} width={160} height={160} className="w-40 h-40 object-cover border border-rule-strong" />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-display text-2xl text-ink">{founder.name}</h3>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest bg-pine text-paper px-2 py-0.5">{founder.badge}</span>
              </div>
              <p className="eyebrow text-ink-faint mb-4">{founder.title}</p>
              <p className="text-ink-soft text-sm mb-6 leading-relaxed">{founder.bio}</p>
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                <LinkedInIcon size={16} /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-y border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="eyebrow mb-8">What guides us</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {coreValues.map((value) => {
              const IconComp = iconMap[value.icon] || Shield;
              return (
                <div key={value.title} className="border-b border-rule lg:border-b-0 lg:border-r lg:last:border-r-0 border-ink/10 p-6">
                  <IconComp size={20} className="text-pine mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-lg text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-ink-soft">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-4xl">
        <p className="eyebrow mb-8">Why traders choose us</p>
        <div className="grid md:grid-cols-2 border-t border-rule">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex items-start gap-4 py-6 border-b border-rule md:odd:border-r md:odd:pr-8 md:even:pl-8 border-ink/10">
              <Check size={18} className="text-pine flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-soft">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink bg-ink text-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-paper">Ready to automate your trading?</h2>
          <p className="mt-4 text-paper/70">Join the traders who trust Aarohan Enterprises to build their edge.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-paper text-ink font-mono text-sm uppercase tracking-wider px-7 py-4 hover:bg-pine hover:text-paper transition-colors">
              Get started <ArrowRight size={16} />
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
