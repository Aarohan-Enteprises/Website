import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy for Aarohan Enterprises. We are committed to protecting your data and privacy.',
  alternates: { canonical: 'https://pinecoder.in/privacy-policy/' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        Your privacy is important to us. It is Aarohan Enterprises&apos; policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting it and how it will be used.
      </p>
    </LegalPageLayout>
  );
}
