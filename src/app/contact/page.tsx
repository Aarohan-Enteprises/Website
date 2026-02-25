'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';
import { GridBackground, FAQAccordion } from '@/components/ui';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { contactFAQs } from '@/data/faq';
import { sendToTelegram, formatContactMessage } from '@/lib/telegram';
import { isValidPhone } from '@/lib/utils';
import {
  Send, ArrowRight, Phone, Mail, MapPin, Zap,
  Shield, PhoneOff, Clock, Check, Loader2,
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
      <section className="relative pt-12 pb-8">
        <GridBackground opacity="opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let&apos;s Build Your <span className="gradient-text">Trading Edge</span>
            </h1>
            <p className="text-lg text-gray-400">
              Free consultation. No obligations. We&apos;ll help transform your ideas into automated strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Send size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Send a Message</h2>
                    <p className="text-gray-500 text-sm">We&apos;ll respond within 2-4 hours</p>
                  </div>
                </div>

                {!success ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800 transition-all" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800 transition-all" placeholder="you@example.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
                        <input type="tel" required maxLength={10} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800 transition-all" placeholder="10-digit number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Service *</label>
                        <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:bg-slate-800 transition-all">
                          <option value="">Select service</option>
                          <option value="Strategy Development">Strategy Development</option>
                          <option value="Trading Automation">Trading Automation</option>
                          <option value="Backtesting">Backtesting Services</option>
                          <option value="Custom Indicators">Custom Indicators</option>
                          <option value="Consultation">Consultation</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Interested Plan</label>
                      <select value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:bg-slate-800 transition-all">
                        <option value="">Not sure yet</option>
                        <option value="Broker Integration">Broker Integration - ₹5,999+</option>
                        <option value="Pine Script Development">Pine Script Development - ₹9,999+</option>
                        <option value="Custom Solution">Custom Solution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Project Details <span className="text-gray-600">(Optional)</span></label>
                      <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:bg-slate-800 transition-all resize-none" placeholder="Describe your trading strategy or requirements..." />
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="w-4 h-4 mt-1 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500" />
                      <label className="text-sm text-gray-400">
                        I agree to the <Link href="/terms-of-service" className="text-blue-400 hover:text-blue-300">Terms</Link> and <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                      </label>
                    </div>

                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                      {submitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
                    </button>

                    <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> Secure</span>
                      <span className="flex items-center gap-1"><PhoneOff size={12} className="text-green-500" /> No spam calls</span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-green-500" /> Quick response</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">We&apos;ll get back to you within 2-4 hours.</p>
                    <button onClick={resetForm} className="text-blue-400 hover:text-blue-300 text-sm">
                      Send another message <ArrowRight size={12} className="inline ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              <a href="https://wa.me/917499462967?text=Hi%2C%20I%27m%20interested%20in%20algo%20trading%20services" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-green-600/10 border border-green-600/30 rounded-xl p-4 hover:bg-green-600/20 transition-all group">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold">WhatsApp</div>
                  <div className="text-sm text-gray-400">Fastest response</div>
                </div>
                <ArrowRight size={16} className="text-green-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="tel:+917499462967" className="flex items-center gap-4 bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 hover:bg-blue-600/20 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold">+91 74994 62967</div>
                  <div className="text-sm text-gray-400">Mon-Sat, 9 AM - 7 PM</div>
                </div>
                <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="mailto:contact@pinecoder.in" className="flex items-center gap-4 bg-purple-600/10 border border-purple-600/30 rounded-xl p-4 hover:bg-purple-600/20 transition-all group">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">contact@pinecoder.in</div>
                  <div className="text-sm text-gray-400">24hr response</div>
                </div>
                <ArrowRight size={16} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                    <MapPin size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-sm text-gray-500">Nagpur, Maharashtra, India</div>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/tMsifPuT8L1NBg9n9" target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5!2d79.1240479!3d21.1520973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7974217c5b1%3A0xfaebf266b7db24a3!2sAarohan%20Enterprises!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="140"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </a>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-slate-900 border border-blue-600/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Zap size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Quick Response</div>
                    <div className="text-sm text-gray-400">Average reply time: 2-4 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Common Questions</h2>
          <FAQAccordion items={contactFAQs} />
        </div>
      </section>
    </MainLayout>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ContactContent />
    </Suspense>
  );
}
