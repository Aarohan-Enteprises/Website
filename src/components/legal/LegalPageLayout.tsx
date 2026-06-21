import { MainLayout } from '@/components/layouts';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <MainLayout>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
        <p className="eyebrow mb-3">Legal · Aarohan Enterprises</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-2">{title}</h1>
        <hr className="rule-ink my-8" />
        <div className="editorial-prose text-[1.0625rem]">{children}</div>
      </article>
    </MainLayout>
  );
}
