import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { footerQuickLinks, footerResourceLinks, footerLegalLinks } from '@/data/navigation';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-soft hover:text-pine transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-band border-t border-ink">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="Aarohan Enterprises" className="h-8 w-8" />
              <h3 className="font-display text-2xl font-semibold text-ink">Aarohan Enterprises</h3>
            </div>
            <p className="eyebrow text-ink-faint mb-3">pinecoder.in</p>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              An Indian studio that turns trading logic into running code — bots, Pine Script,
              and screeners built to your exact rules.
            </p>
          </div>

          <FooterColumn title="Sections" links={footerQuickLinks} />
          <FooterColumn title="Resources" links={footerResourceLinks} />

          <div>
            <h4 className="eyebrow mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-pine mt-0.5 w-4 h-4 flex-shrink-0" />
                <span className="text-ink-soft">Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-pine mt-0.5 w-4 h-4 flex-shrink-0" />
                <a href="tel:+917499462967" className="text-ink-soft hover:text-pine transition-colors font-mono">
                  +91 74994 62967
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-pine mt-0.5 w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@pinecoder.in" className="text-ink-soft hover:text-pine transition-colors">
                  contact@pinecoder.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="text-pine mt-0.5 w-4 h-4 flex-shrink-0" />
                <a href="https://wa.me/917499462967" target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-pine transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-faint font-mono">
            © {new Date().getFullYear()} Aarohan Enterprises · pinecoder.in
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink-faint hover:text-pine transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
