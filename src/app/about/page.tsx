import type { Metadata } from 'next';
import { MainLayout } from '@/components/layouts';
import { GridBackground } from '@/components/ui';
import { Users, Award, Cloud, Code, Target, Eye, Shield, TrendingUp, Handshake, Lightbulb, Check, ArrowRight, LineChart } from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/BrandIcons';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { stats, certifications, coreValues, whyChooseUs, founder } from '@/data/about';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Automated Algorithmic Trading Experts',
  description: "Learn about PineCoder.in - India's leading automated algorithmic trading development company. Meet our team of experts who transform trading ideas into profitable algorithms.",
  alternates: { canonical: 'https://pinecoder.in/about/' },
  openGraph: {
    title: 'About Us - PineCoder.in | Automated Algorithmic Trading Experts',
    description: "Learn about PineCoder.in - India's leading automated algorithmic trading development company.",
    images: ['https://pinecoder.in/og-image.jpg'],
  },
};

const iconMap: Record<string, React.ElementType> = {
  Shield, TrendingUp, Handshake, Lightbulb,
  Award, Cloud, Code,
};

export default function AboutPage() {
  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section className="relative pt-16 pb-12">
        <GridBackground opacity="opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
              <Users size={14} />
              <span>Meet the Team Behind PineCoder</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Building the Future of <span className="gradient-text">Algo Trading</span>
            </h1>
            <p className="text-lg text-gray-400">
              We&apos;re traders and developers on a mission to make algorithmic trading accessible to everyone in India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                <div className="w-8 h-px bg-blue-400"></div>
                OUR STORY
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">From Trading Floors to Code</h2>
              <div className="space-y-4 text-gray-400">
                <p>PineCoder was born from a simple observation: talented traders across India had profitable strategies but lacked the technical expertise to automate them.</p>
                <p>Built by quantitative trading engineers with hands-on experience in algorithmic platforms and real-time market data systems, we bring institutional-grade technology to retail traders.</p>
                <p>Today, we&apos;re the trusted partner for traders looking to automate their edge — from Pine Script indicators to full-stack trading bots.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {certifications.map((cert) => {
                  const IconComp = iconMap[cert.icon] || Code;
                  return (
                    <div key={cert.label} className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm">
                      <IconComp size={16} className={cert.color} />
                      <span className="text-gray-300">{cert.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl border border-slate-800 p-6 lg:p-8">
                <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-500 text-xs ml-2">strategy.pine</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div><span className="text-purple-400">{'//@version=5'}</span></div>
                    <div><span className="text-blue-400">strategy</span>(<span className="text-green-400">&quot;PineCoder Strategy&quot;</span>)</div>
                    <div className="text-gray-500">{'// Your edge, automated'}</div>
                    <div><span className="text-blue-400">if</span> buyCondition</div>
                    <div className="pl-4"><span className="text-yellow-400">strategy.entry</span>(<span className="text-green-400">&quot;Long&quot;</span>)</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-2">
                  <LineChart size={16} /> 3+ Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600/10 to-slate-900 rounded-2xl border border-blue-600/20 p-8">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <Target size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To democratize algorithmic trading by making it accessible, affordable, and profitable for every trader in India. Technology should empower traders, not complicate their journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-600/10 to-slate-900 rounded-2xl border border-green-600/20 p-8">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mb-6">
                <Eye size={28} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To become India&apos;s most trusted algorithmic trading partner, setting new standards in strategy development, risk management, and automated execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Meet the Founder</h2>
            <p className="text-gray-400">The mind behind PineCoder</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-6 flex items-center justify-center bg-slate-900">
                  <Image src={founder.image} alt={founder.name} width={160} height={160} className="w-40 h-40 rounded-2xl object-cover border-2 border-slate-700" />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                    <span className="bg-blue-600/20 text-blue-400 text-xs font-medium px-2 py-1 rounded">{founder.badge}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{founder.title}</p>
                  <p className="text-gray-400 text-sm mb-6">{founder.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {founder.skills.map((skill) => (
                      <span key={skill} className="bg-slate-800 text-gray-300 text-xs px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm">
                    <LinkedInIcon size={18} />
                    Connect on LinkedIn
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Our Core Values</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {coreValues.map((value) => {
              const IconComp = iconMap[value.icon] || Shield;
              return (
                <div key={value.title} className={`bg-slate-900/50 border border-slate-800 rounded-xl p-5 ${value.hoverColor} transition-colors group`}>
                  <div className={`w-10 h-10 ${value.iconBg} rounded-lg flex items-center justify-center mb-4 ${value.iconHoverBg} transition-colors`}>
                    <IconComp size={18} className={value.iconColor} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Why Traders Choose Us</h2>
              <p className="text-gray-400">What sets PineCoder apart</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-slate-900/30 rounded-xl p-5 border border-slate-800/50">
                  <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to automate your trading?</h2>
            <p className="text-gray-400 mb-6">Join 500+ traders who trust PineCoder for their algo trading needs</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Started <ArrowRight size={16} />
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
