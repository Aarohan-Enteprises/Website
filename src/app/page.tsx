'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { FloatingOrbs, GridBackground, BackToTop } from '@/components/ui';
import {
  ArrowRight, ArrowUp, ArrowDown, Shield, Zap, Headset, TrendingUp,
  Bot, Code, Filter, CheckCircle, ChevronDown, ExternalLink,
  BarChart3, FileText, Wrench, Route, MessageCircle, Rocket, Check
} from 'lucide-react';

const typewriterWords = ['Visualized.', 'Simplified.', 'Real-time.', 'Actionable.', 'Organized.'];

function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const delay = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

export default function HomePage() {
  const typewriterText = useTypewriter(typewriterWords);

  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section id="home" className="relative min-h-[90vh] flex items-center py-12 overflow-hidden">
        <GridBackground />
        <FloatingOrbs />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-hero-fade-in">
              <div className="mb-4">
                <span className="text-lg md:text-xl font-medium text-gray-400">Your Data.</span>{' '}
                <span className="text-lg md:text-xl font-bold">
                  <span className="typewriter-text gradient-text">{typewriterText}</span>
                  <span className="typewriter-cursor">|</span>
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smarter Dashboards.<br />
                <span className="gradient-text">Better Decisions.</span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-lg">
                Custom trading dashboards that turn market noise into actionable insights. Track P&L, monitor positions, and execute faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/assessment" className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 text-lg text-center">
                  Take Assessment <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/pricing" className="bg-slate-800/50 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300 border border-slate-700 text-lg text-center">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Right: Dashboard Visual */}
            <div className="relative animate-hero-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Live Dashboard</span>
                  </div>
                  <span className="text-xs text-gray-500">Updated: Just now</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 rounded-xl p-4 border border-green-500/20">
                    <div className="text-xs text-gray-400 mb-1">Today&apos;s P&L</div>
                    <div className="text-2xl font-bold text-green-400">+₹24,850</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUp size={12} className="text-green-400" />
                      <span className="text-green-400 text-sm">+3.2%</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-xs text-gray-400 mb-1">This Week</div>
                    <div className="text-2xl font-bold text-blue-400">+₹1,42,300</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUp size={12} className="text-blue-400" />
                      <span className="text-blue-400 text-sm">+8.7%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Portfolio Value</span>
                    <span className="text-white font-semibold">₹18,42,500</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {[45, 60, 40, 70, 55, 80, 75, 50, 85, 90, 95, 100].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${h === 40 || h === 50 ? 'bg-gradient-to-t from-red-500/40 to-red-500/10' : 'bg-gradient-to-t from-green-500/40 to-green-500/10'} ${i === 11 ? 'animate-pulse' : ''}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-gray-400 mb-2">Active Positions</div>
                  <div className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">N</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">NIFTY 24500 CE</div>
                        <div className="text-gray-500 text-xs">2 lots &bull; Avg: ₹245</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">+₹4,200</div>
                      <div className="text-green-400 text-xs">+8.57%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400 text-xs font-bold">B</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">BANKNIFTY FUT</div>
                        <div className="text-gray-500 text-xs">1 lot &bull; Avg: ₹52,400</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 font-semibold">-₹1,850</div>
                      <div className="text-red-400 text-xs">-0.35%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-green-600/25 flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Live Data
              </div>

              <div className="absolute -bottom-4 -left-4 bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl max-w-[200px] animate-hero-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">Trade Executed</div>
                    <div className="text-gray-500 text-xs">NIFTY CE +₹2,400</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ChevronDown size={28} className="text-gray-500" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 border-y border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              <span className="text-sm">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              <span className="text-sm">Sub-ms Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <Headset size={16} className="text-blue-500" />
              <span className="text-sm">Dedicated Support</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-purple-500" />
              <span className="text-sm">Proven Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What We Build</h2>
            <p className="text-xl text-gray-400">Three core solutions. One mission: automate your profits.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Bot, title: 'Trading Bots', color: 'blue',
                description: 'Fully automated systems for stocks, F&O, and crypto. Works with Zerodha, Angel One, and more.',
                features: ['Multi-broker support', 'Risk management built-in', 'Real-time monitoring'],
              },
              {
                icon: Code, title: 'Pine Script & Indicators', color: 'green',
                description: 'Custom TradingView indicators, alerts, and strategies coded to your exact specifications.',
                features: ['Custom indicators', 'Alert systems', 'Strategy scripts'],
              },
              {
                icon: Filter, title: 'Custom Screener Dashboard', color: 'purple',
                description: 'Real-time stock screeners and dashboards tailored to your trading criteria.',
                features: ['Custom filters & scans', 'Real-time alerts', 'Multi-timeframe analysis'],
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-8 rounded-2xl border border-slate-700/50 hover:border-${service.color}-500/50 transition-all duration-500 hover:-translate-y-2`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-16 h-16 bg-${service.color}-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon size={30} className={`text-${service.color}-500`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-semibold text-lg group">
              See all services & pricing <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section id="tools" className="py-20 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-600/10 border border-amber-600/20 rounded-full px-4 py-1.5 text-sm text-amber-400 mb-4">
              <Wrench size={14} />
              <span>Free to Use</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Tools</h2>
            <p className="text-xl text-gray-400">Free tools built by our team to simplify your workflow.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="https://vbc.pinecoder.in" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 block">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 size={30} className="text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Volatility Breakout Screener</h3>
                <p className="text-gray-400 mb-6">Real-time crypto volatility screener powered by Bollinger Bands & ATR analysis across multiple timeframes.</p>
                <ul className="space-y-3 text-sm text-gray-400 mb-6">
                  {['Real-time WebSocket data', 'Multi-timeframe analysis', 'Breakout & squeeze alerts'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all">
                  Open Tool <ExternalLink size={14} />
                </span>
              </div>
            </a>

            <a href="https://pdf2.in" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-8 rounded-2xl border border-slate-700/50 hover:border-rose-500/50 transition-all duration-500 hover:-translate-y-2 block">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-rose-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={30} className="text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">PDF Editor</h3>
                <p className="text-gray-400 mb-6">Free browser-based PDF tools. Merge, split, rotate, compress, watermark, and convert PDFs instantly.</p>
                <ul className="space-y-3 text-sm text-gray-400 mb-6">
                  {['Merge, split & rotate PDFs', 'Compress & watermark', 'PDF & DOCX conversion'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-rose-400 font-semibold group-hover:gap-3 transition-all">
                  Open Tool <ExternalLink size={14} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-900/50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-4">
              <Route size={14} />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-lg text-gray-400">From idea to live trading in 3 simple steps</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                <div className="h-full bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 rounded-full opacity-20" />
              </div>

              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    num: 1, icon: MessageCircle, color: 'blue',
                    title: 'Tell Us Your Strategy',
                    description: "Share your trading logic and ideas. We'll assess feasibility and provide a detailed quote.",
                    features: ['Free consultation', 'NDA available', '24hr response'],
                  },
                  {
                    num: 2, icon: Code, color: 'green',
                    title: 'We Build & Test',
                    description: 'Our team codes, backtests, and optimizes your bot for maximum performance.',
                    features: ['Clean, documented code', 'Rigorous backtesting', 'Performance optimization'],
                  },
                  {
                    num: 3, icon: Rocket, color: 'purple',
                    title: 'Go Live',
                    description: 'Deploy to your broker account. Your bot trades while you relax.',
                    features: ['Broker integration', '24/7 automated trading', 'Ongoing support'],
                  },
                ].map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.num} className="group relative">
                      <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-${step.color}-500/50 transition-all duration-500 h-full`}>
                        <div className="absolute -top-4 left-6">
                          <div className={`w-8 h-8 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-${step.color}-500/30`}>
                            {step.num}
                          </div>
                        </div>
                        <div className={`w-16 h-16 bg-${step.color}-600/10 rounded-2xl flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform`}>
                          <StepIcon size={28} className={`text-${step.color}-400`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                        <div className="space-y-2">
                          {step.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                              <Check size={12} className={`text-${step.color}-400`} />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                        {idx < 2 && (
                          <div className="lg:hidden flex justify-center mt-6">
                            <ArrowDown size={20} className={`text-${step.color}-500`} />
                          </div>
                        )}
                      </div>
                      {idx < 2 && (
                        <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                          <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center">
                            <ArrowRight size={14} className={`text-${step.color}-400`} />
                          </div>
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Check size={18} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <p className="text-gray-500 text-sm mt-3">Free consultation. No obligations.</p>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </MainLayout>
  );
}
