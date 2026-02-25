import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { footerQuickLinks, footerResourceLinks, footerLegalLinks } from '@/data/navigation';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

export function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Pine</span>
              <span className="gradient-text">Coder.in</span>
            </h3>
            <p className="text-gray-400 mb-4">
              India&apos;s premier automated algorithmic trading development company. Transform your trading ideas into profitable algorithms.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerResourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1 w-4 h-4 flex-shrink-0" />
                <span className="text-gray-400">Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-blue-500 mt-1 w-4 h-4 flex-shrink-0" />
                <a href="tel:+91-7499462967" className="text-gray-400 hover:text-white transition-colors">
                  +91-7499462967
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-blue-500 mt-1 w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@pinecoder.in" className="text-gray-400 hover:text-white transition-colors">
                  contact@pinecoder.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="text-green-500 mt-1 w-4 h-4 flex-shrink-0" />
                <a href="https://wa.me/917499462967" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Aarohan Enterprises (PineCoder FinTech). All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {footerLegalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
