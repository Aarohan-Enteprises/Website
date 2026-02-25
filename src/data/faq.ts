export interface FAQItem {
  question: string;
  answer: string;
}

export const contactFAQs: FAQItem[] = [
  {
    question: "What's the typical response time?",
    answer: 'We respond within 2-4 hours during business hours (Mon-Sat, 9 AM - 7 PM IST). WhatsApp gets the fastest response.',
  },
  {
    question: 'What languages do you support?',
    answer: 'Pine Script, Python, MQL4/5, AFL (AmiBroker), JavaScript/Node.js, and more based on your needs.',
  },
  {
    question: 'How long does strategy development take?',
    answer: 'Simple strategies: 3-5 days. Complex strategies with multiple indicators: 7-14 days. We provide accurate timelines after the discovery call.',
  },
  {
    question: 'Do you provide source code?',
    answer: 'Yes, you own 100% of the code with complete documentation. We also offer training sessions if needed.',
  },
  {
    question: 'Is my strategy confidential?',
    answer: 'Absolutely. All strategies are encrypted and stored securely. We sign NDAs upon request.',
  },
];

export const pricingFAQs: FAQItem[] = [
  {
    question: 'Are the prices fixed?',
    answer: 'Prices shown are starting estimates. Every project is different — we provide an accurate quotation after a discovery call to understand your exact requirements and scope.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers (NEFT/RTGS/IMPS), UPI payments, and international wire transfers.',
  },
  {
    question: 'How does milestone-based payment work?',
    answer: 'We break the project into phases. You pay and approve each milestone before we proceed to the next, ensuring full transparency and no risk.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Since we use milestone-based payments, you only pay for approved work. If a milestone doesn\'t meet expectations, we revise it at no extra cost.',
  },
];
