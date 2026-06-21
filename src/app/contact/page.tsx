'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { FAQAccordion } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { contactFAQs } from '@/data/faq';
import { sendToTelegram, formatContactMessage } from '@/lib/telegram';
import { isValidPhone } from '@/lib/utils';
import {
  ArrowRight, Phone, Mail, MapPin, Check, Loader2, Shield, PhoneOff, Clock,
} from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', plan: '', message: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      const planMap: Record<string, string> = { 'broker-integration': 'Broker Integration', 'pine-script': 'Pine Script Development', custom: 'Custom Solution' };
      const mapped = planMap[plan.toLowerCase()];
      if (mapped) setFormData((prev) => ({ ...prev, plan: mapped }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone && !isValidPhone(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setSubmitting(true);
    const message = formatContactMessage(formData);
    const sent = await sendToTelegram(message);
    if (sent) {
      setSuccess(true);
    } else {
      alert('Message sent! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', service: '', plan: '', message: '' });
      setAgreed(false);
    }
    setSubmitting(false);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', service: '', plan: '', message: '' });
    setAgreed(false);
    setSuccess(false);
  };

  return (
    <MainLayout simpleFooter>
      {/* Hero */}
      <section className="border-b border-ink">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 max-w-3xl">
          <p className="eyebrow mb-4">Get in touch</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink">
            Let&apos;s build your <span className="accent-ink">trading edge.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Free consultation, no obligations. Tell us the idea and we&apos;ll tell you
            how to automate it.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-px bg-rule border border-ink max-w-6xl">
          {/* Form */}
          <div className="lg:col-span-3 bg-surface p-6 md:p-10">
            <p className="eyebrow mb-2">Send a message</p>
            <h2 className="font-display text-2xl text-ink mb-1">We reply within 2–4 hours</h2>
            <hr className="rule my-6" />

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Name *">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="field" placeholder="Your name" />
                  </Field>
                  <Field label="Email *">
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="field" placeholder="you@example.com" />
                  </Field>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Phone *">
                    <input type="tel" required maxLength={10} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })} className="field" placeholder="10-digit number" />
                  </Field>
                  <Field label="Service *">
                    <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="field">
                      <option value="">Select service</option>
                      <option value="Strategy Development">Strategy Development</option>
                      <option value="Trading Automation">Trading Automation</option>
                      <option value="Backtesting">Backtesting Services</option>
                      <option value="Custom Indicators">Custom Indicators</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                </div>

                <Field label="Interested plan">
                  <select value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} className="field">
                    <option value="">Not sure yet</option>
                    <option value="Broker Integration">Broker Integration — ₹5,999+</option>
                    <option value="Pine Script Development">Pine Script Development — ₹9,999+</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </Field>

                <Field label="Project details (optional)">
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="field resize-none" placeholder="Describe your trading strategy or requirements..." />
                </Field>

                <label className="flex items-start gap-3 text-sm text-ink-soft">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="w-4 h-4 mt-0.5 accent-pine" />
                  <span>
                    I agree to the <Link href="/terms-of-service" className="link-underline">Terms</Link> and <Link href="/privacy-policy" className="link-underline">Privacy Policy</Link>
                  </span>
                </label>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <ArrowRight size={15} /></>}
                </button>

                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">
                  <span className="flex items-center gap-1.5"><Shield size={12} className="text-pine" /> Secure</span>
                  <span className="flex items-center gap-1.5"><PhoneOff size={12} className="text-pine" /> No spam calls</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-pine" /> Quick response</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-16">
                <div className="w-14 h-14 border border-pine flex items-center justify-center mx-auto mb-5">
                  <Check size={26} className="text-pine" />
                </div>
                <h3 className="font-display text-2xl text-ink mb-2">Message sent</h3>
                <p className="text-ink-soft mb-6">We&apos;ll get back to you within 2–4 hours.</p>
                <button onClick={resetForm} className="link-underline font-mono text-sm uppercase tracking-wider">
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 bg-band p-6 md:p-8 space-y-px">
            <ContactRow href="https://wa.me/917499462967?text=Hi%2C%20I%27m%20interested%20in%20algo%20trading%20services" icon={<WhatsAppIcon size={18} />} title="WhatsApp" sub="Fastest response" external />
            <ContactRow href="tel:+917499462967" icon={<Phone size={18} />} title="+91 74994 62967" sub="Mon–Sat, 9 AM – 7 PM" mono />
            <ContactRow href="mailto:contact@pinecoder.in" icon={<Mail size={18} />} title="contact@pinecoder.in" sub="24-hour response" />

            <div className="bg-surface border border-rule p-4 !mt-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-pine" />
                <div>
                  <div className="font-display text-ink">Nagpur, Maharashtra</div>
                  <div className="font-mono text-xs text-ink-faint">India</div>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/tMsifPuT8L1NBg9n9" target="_blank" rel="noopener noreferrer" className="block">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5!2d79.1240479!3d21.1520973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7974217c5b1%3A0xfaebf266b7db24a3!2sAarohan%20Enterprises!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="140"
                  style={{ border: 0, pointerEvents: 'none', filter: 'grayscale(0.4) sepia(0.15)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-ink bg-band">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
          <header className="mb-10">
            <p className="eyebrow mb-3">Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">Common questions</h2>
          </header>
          <FAQAccordion items={contactFAQs} />
        </div>
      </section>
    </MainLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-ink-soft block mb-2">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({ href, icon, title, sub, external, mono }: {
  href: string; icon: React.ReactNode; title: string; sub: string; external?: boolean; mono?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 bg-surface border border-rule p-4 hover:border-ink transition-colors"
    >
      <span className="text-pine flex-shrink-0">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className={`block text-ink truncate ${mono ? 'font-mono text-sm' : 'font-display'}`}>{title}</span>
        <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">{sub}</span>
      </span>
      <ArrowRight size={15} className="text-ink-faint group-hover:text-pine group-hover:translate-x-1 transition-all" />
    </a>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ContactContent />
    </Suspense>
  );
}
