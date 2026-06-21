import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Aarohan Enterprises. Trading involves risk, and past performance is not indicative of future results.',
  alternates: { canonical: 'https://pinecoder.in/disclaimer/' },
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <p>
        The information provided by Aarohan Enterprises is for educational and informational purposes only. Trading in financial markets involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results. We are not financial advisors, and nothing on this website should be construed as financial advice.
      </p>
    </LegalPageLayout>
  );
}
