import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Read the refund policy for Aarohan Enterprises. Milestone-based payment approach ensures transparency and satisfaction.',
  alternates: { canonical: 'https://pinecoder.in/refund-policy/' },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund Policy">
      <p>
        At Aarohan Enterprises, we follow a milestone-based payment approach to ensure transparency and mutual satisfaction. Payments are collected at defined project milestones, and you approve each phase before we proceed to the next. Refunds are processed based on the work completed up to the point of cancellation. Once a milestone is approved and delivered, that portion is non-refundable. We encourage clear communication throughout the project to ensure your complete satisfaction with our services.
      </p>
    </LegalPageLayout>
  );
}
