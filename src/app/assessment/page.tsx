'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { GridBackground } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { quizQuestions, getReadinessLevel } from '@/data/assessment';
import { sendToTelegram, formatAssessmentMessage } from '@/lib/telegram';
import { isValidPhone } from '@/lib/utils';
import type { QuizAnswer } from '@/types/assessment';
import {
  ClipboardCheck, Clock, TrendingUp, Lock, ArrowRight,
  Check, RotateCcw, Headset, PhoneOff, Shield,
  Lightbulb, Loader2, Tags, CheckCircle,
} from 'lucide-react';

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Consultation form
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
    }, 300);
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

  const strokeDasharray = 2 * Math.PI * 48;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  if (showResults) {
    return (
      <MainLayout>
        <section className="relative">
          <GridBackground opacity="opacity-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
            <div className="min-h-[calc(100vh-140px)] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Your Results</h1>
                  </div>
                  <p className="text-gray-500 text-sm ml-11">Algo trading readiness analysis</p>
                </div>
                <button onClick={retake} className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
                  <RotateCcw size={14} /> Retake
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-6 flex-1">
                {/* Score + Recommendations */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                        <svg className="w-28 h-28 transform -rotate-90 relative" viewBox="0 0 112 112">
                          <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="none" />
                          <circle cx="56" cy="56" r="48" stroke="url(#scoreGradient)" strokeWidth="8" fill="none"
                            strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-white">{percentage}%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">Your Readiness Level</p>
                        <div className={`${level.bgGradient} text-white text-base px-5 py-2 rounded-lg font-bold inline-flex items-center gap-2 shadow-lg`}>
                          {level.level}
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                          <span className="text-white font-semibold">{totalScore}</span> out of {maxScore} points
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Lightbulb size={16} className="text-yellow-500" />
                      </span>
                      What We Recommend
                    </h3>
                    <div className="space-y-3">
                      {level.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-green-500/30 transition-colors">
                          <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={10} className="text-green-500" />
                          </span>
                          <span className="text-gray-300 text-sm leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation Form */}
                <div>
                  {!formSuccess ? (
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 h-full">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Headset size={28} className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Get Free Consultation</h3>
                          <p className="text-gray-400">We&apos;ll reach out within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 ml-1">
                        <span className="flex items-center gap-1.5"><PhoneOff size={12} className="text-green-500" /> No spam calls</span>
                        <span className="flex items-center gap-1.5"><Lock size={12} className="text-green-500" /> Data never shared</span>
                      </div>
                      <form onSubmit={handleConsultation} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Your Name *</label>
                          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 transition-colors text-base" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 transition-colors text-base" placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Phone <span className="text-gray-600">(Optional - 10 digits)</span></label>
                          <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 transition-colors text-base" placeholder="9876543210" />
                        </div>
                        <button type="submit" disabled={formSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg flex items-center justify-center gap-2 disabled:opacity-50">
                          {formSubmitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <>Get Free Consultation <ArrowRight size={18} /></>}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-green-600/10 rounded-xl p-6 border border-green-500/30 h-full flex items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle size={32} className="text-green-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Thank You!</h3>
                          <p className="text-gray-400">We&apos;ll contact you within 24 hours.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <a href={`https://wa.me/917499462967?text=Hi%2C%20I%20just%20completed%20the%20assessment%20and%20scored%20${percentage}%25.%20I%27d%20like%20to%20discuss%20algo%20trading%20options.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                    <WhatsAppIcon size={16} /> WhatsApp Us
                  </a>
                  <Link href="/pricing" className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm border border-slate-700">
                    <Tags size={14} /> View Pricing
                  </Link>
                </div>
                <div className="text-gray-500 text-xs">
                  <Shield size={12} className="inline text-green-500 mr-1" /> Your data is safe with us
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  // Quiz View
  const q = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <MainLayout>
      <section className="min-h-[calc(100vh-64px)] relative">
        <GridBackground opacity="opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Sidebar */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 rounded-full px-4 py-2">
                  <ClipboardCheck size={16} className="text-blue-500" />
                  <span className="text-blue-400 text-sm font-medium">Free Assessment</span>
                </div>

                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    Test Your Algo Trading <span className="gradient-text">Readiness</span>
                  </h1>
                  <p className="text-gray-400">Answer 5 quick questions to discover how prepared you are for automated trading.</p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-white">Your Progress</span>
                    <span className="text-sm text-blue-400 font-medium">{currentQuestion + 1} of {quizQuestions.length}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        i < currentQuestion
                          ? 'bg-green-600 text-white'
                          : i === currentQuestion
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-400'
                      }`}>
                        {i < currentQuestion ? <Check size={12} /> : i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock size={16} className="text-blue-500" />
                    <span>Takes less than 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <TrendingUp size={16} className="text-green-500" />
                    <span>Get personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Lock size={16} className="text-purple-500" />
                    <span>100% free, no signup required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quiz */}
            <div className="lg:col-span-3">
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                <div className="mb-6">
                  <span className="inline-block bg-blue-600/20 text-blue-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Question {currentQuestion + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{q.question}</h2>
                </div>
                <div className="space-y-3">
                  {q.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index, option.score)}
                      className="w-full text-left p-4 bg-slate-800 border border-slate-700 rounded-xl text-gray-300 hover:border-blue-500 hover:bg-slate-800/80 transition-all duration-200 flex items-center gap-4 group"
                    >
                      <span className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
