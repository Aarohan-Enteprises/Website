import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  simpleFooter?: boolean;
}

export function MainLayout({ children, simpleFooter }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {simpleFooter ? (
        <footer className="bg-slate-950 py-8 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Aarohan Enterprises. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
                <a href="/terms-of-service" className="hover:text-white transition-colors">Terms</a>
                <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <Footer />
      )}
    </div>
  );
}
