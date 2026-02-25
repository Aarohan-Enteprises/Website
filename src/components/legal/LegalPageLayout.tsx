import { MainLayout } from '@/components/layouts';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          </div>
          <div className="bg-slate-900 p-8 rounded-2xl">
            {children}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
