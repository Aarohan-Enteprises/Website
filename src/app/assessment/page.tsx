'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { quizQuestions, getReadinessLevel } from '@/data/assessment';
import { sendToTelegram, formatAssessmentMessage } from '@/lib/telegram';
import { isValidPhone } from '@/lib/utils';
import type { QuizAnswer } from '@/types/assessment';
import {
  Clock, TrendingUp, Lock, ArrowRight, Check, RotateCcw, PhoneOff, Shield,
  Loader2, Tags, CheckCircle,
} from 'lucide-react';

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const maxScore = quizQuestions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const level = getReadinessLevel(percentage);

  const selectAnswer = (optionIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { optionIndex, score };
    setAnswers(newAnswers);
    setTotalScore(totalScore + score);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 250);
  };

  const retake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTotalScore(0);
    setShowResults(false);
    setFormSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && !isValidPhone(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setFormSubmitting(true);

    const answersSummary = answers.map((ans, idx) => {
      const q = quizQuestions[idx];
      return `Q${idx + 1}: ${q.options[ans.optionIndex].text}`;
    }).join('\n');

    const message = formatAssessmentMessage({
      name, email, phone: phone || undefined,
      score: totalScore, maxScore, percentage, level: level.level, answersSummary,
    });
    await sendToTelegram(message);
    setFormSubmitting(false);
    setFormSuccess(true);
  };

  // ── Results ───────────────────────────────────────────────────
  if (showResults) {
    return (
      <MainLayout>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex items-end justify-between mb-8 border-b border-ink pb-5">
            <div>
              <p className="eyebrow mb-2">Assessment · Results</p>
              <h1 className="font-display text-3xl md:text-4xl font-medium text-ink">Your readiness analysis</h1>
            </div>
            <button onClick={retake} className="link-underline font-mono text-xs uppercase tracking-wider flex items-center gap-2">
              <RotateCcw size={13} /> Retake
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-rule border border-ink">
            {/* Score + recommendations */}
            <div className="bg-surface p-7 md:p-9">
              <div className="flex items-center gap-7 pb-7 border-b border-rule">
                <div className="relative flex-shrink-0">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" stroke="#E3D0BB" strokeWidth="6" fill="none" />
                    <circle
                      cx="56" cy="56" r="48" stroke="#0E5C4A" strokeWidth="6" fill="none"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - percentage / 100)}
                      strokeLinecap="butt"
                      style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-2xl text-ink">{percentage}%</span>
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-ink-faint mb-2">Readiness level</p>
                  <span className={`inline-block ${level.bgGradient} text-paper font-mono text-sm uppercase tracking-wider px-4 py-1.5`}>
                    {level.level}
                  </span>
                  <p className="mt-3 font-mono text-sm text-ink-soft">
                    <span className="text-ink">{totalScore}</span> / {maxScore} points
                  </p>
                </div>
              </div>

              <p className="eyebrow mt-7 mb-4">What we recommend</p>
              <ul className="space-y-3">
                {level.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                    <Check size={15} className="text-pine flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultation form */}
            <div className="bg-band p-7 md:p-9">
              {!formSuccess ? (
                <>
                  <p className="eyebrow mb-2">Free consultation</p>
                  <h3 className="font-display text-2xl text-ink mb-1">We&apos;ll reach out within 24 hours</h3>
                  <div className="flex flex-wrap gap-4 mt-3 mb-6 font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">
                    <span className="flex items-center gap-1.5"><PhoneOff size={12} className="text-pine" /> No spam calls</span>
                    <span className="flex items-center gap-1.5"><Lock size={12} className="text-pine" /> Data never shared</span>
                  </div>
                  <form onSubmit={handleConsultation} className="space-y-4">
                    <label className="block">
                      <span className="eyebrow text-ink-soft block mb-2">Your name *</span>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="John Doe" />
                    </label>
                    <label className="block">
                      <span className="eyebrow text-ink-soft block mb-2">Email *</span>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" placeholder="john@example.com" />
                    </label>
                    <label className="block">
                      <span className="eyebrow text-ink-soft block mb-2">Phone (optional)</span>
                      <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} className="field" placeholder="9876543210" />
                    </label>
                    <button type="submit" disabled={formSubmitting} className="btn-primary w-full disabled:opacity-50">
                      {formSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <>Get free consultation <ArrowRight size={15} /></>}
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 border border-pine flex items-center justify-center mb-5">
                    <CheckCircle size={26} className="text-pine" />
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-2">Thank you</h3>
                  <p className="text-ink-soft">We&apos;ll contact you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/917499462967?text=Hi%2C%20I%20just%20completed%20the%20assessment%20and%20scored%20${percentage}%25.`} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5">
                <WhatsAppIcon size={15} /> WhatsApp us
              </a>
              <Link href="/pricing" className="btn-ghost !py-2.5 !px-5">
                <Tags size={14} /> View pricing
              </Link>
            </div>
            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint flex items-center gap-1.5">
              <Shield size={12} className="text-pine" /> Your data is safe
            </span>
          </div>
        </section>
      </MainLayout>
    );
  }

  // ── Quiz ──────────────────────────────────────────────────────
  const q = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 space-y-8">
            <div>
              <p className="eyebrow mb-4">Free assessment</p>
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-ink leading-tight">
                Test your algo trading <span className="accent-ink">readiness.</span>
              </h1>
              <p className="mt-4 text-ink-soft">
                Five quick questions to gauge how prepared you are for automated trading.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="eyebrow text-ink-soft">Progress</span>
                <span className="font-mono text-xs text-pine">{currentQuestion + 1} / {quizQuestions.length}</span>
              </div>
              <div className="h-1 bg-rule">
                <div className="h-full bg-pine transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="hidden lg:block space-y-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
              <li className="flex items-center gap-3"><Clock size={14} className="text-pine" /> Under 2 minutes</li>
              <li className="flex items-center gap-3"><TrendingUp size={14} className="text-pine" /> Personalised recommendations</li>
              <li className="flex items-center gap-3"><Lock size={14} className="text-pine" /> No signup required</li>
            </ul>
          </div>

          {/* Question */}
          <div className="lg:col-span-3">
            <div className="card p-6 sm:p-9">
              <p className="eyebrow mb-5">Question {String(currentQuestion + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-7">{q.question}</h2>
              <div className="border-t border-rule">
                {q.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index, option.score)}
                    className="w-full text-left flex items-center gap-4 py-4 border-b border-rule group hover:bg-band/60 transition-colors"
                  >
                    <span className="font-mono text-sm text-ink-faint w-6 group-hover:text-pine transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-ink">{option.text}</span>
                    <ArrowRight size={16} className="text-rule-strong group-hover:text-pine group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
