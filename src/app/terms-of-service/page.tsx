import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms of service for PineCoder.in. Terms and conditions for using our automated algorithmic trading services.',
  alternates: { canonical: 'https://pinecoder.in/terms-of-service/' },
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p className="text-gray-400">
        By accessing the website at https://pinecoder.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
      </p>
    </LegalPageLayout>
  );
}
