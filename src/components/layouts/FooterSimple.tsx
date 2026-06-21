import Link from 'next/link';

export function FooterSimple() {
  return (
    <footer className="bg-band border-t border-ink py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <p className="text-ink-faint">
            © {new Date().getFullYear()} Aarohan Enterprises. All rights reserved.
          </p>
          <div className="flex gap-6 uppercase tracking-wider">
            <Link href="/privacy-policy" className="text-ink-faint hover:text-pine transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-ink-faint hover:text-pine transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-ink-faint hover:text-pine transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
