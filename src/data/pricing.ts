import type { PricingPlan, AddOn, ComparisonRow } from '@/types/pricing';

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    subtitle: 'For beginners',
    price: '$250',
    priceLabel: '/strategy',
    features: [
      '1 Trading Strategy',
      'Pine Script or Python',
      '1 Year Backtesting',
      '1 Broker Integration',
      '30 Days Support',
      'Source Code Included',
    ],
    ctaText: 'Get Started',
    ctaLink: '/contact?plan=starter',
    iconColor: 'text-blue-400',
    borderColor: 'border-slate-800',
  },
  {
    name: 'Professional',
    subtitle: 'For serious traders',
    price: '$500',
    priceLabel: '/strategy',
    features: [
      'Complex Strategy Development',
      'Any Language/Platform',
      '5 Years Backtesting',
      'Multiple Broker Support',
      '90 Days Priority Support',
      'Risk Management Suite',
      'Performance Dashboard',
    ],
    ctaText: 'Get Started',
    ctaLink: '/contact?plan=professional',
    popular: true,
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/50',
  },
  {
    name: 'Enterprise',
    subtitle: 'For institutions',
    price: 'Custom',
    priceLabel: '',
    features: [
      'Multiple Strategies',
      'Institutional Grade Systems',
      'Co-location Support',
      'Dedicated Team',
      '1 Year+ Priority Support',
      'Custom Infrastructure',
    ],
    ctaText: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise',
    iconColor: 'text-purple-400',
    borderColor: 'border-slate-800',
  },
];

export const addOns: AddOn[] = [
  {
    name: 'Advanced Backtesting',
    description: '10+ years with walk-forward analysis',
    price: '$150',
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-blue-600/10',
  },
  {
    name: 'ML Integration',
    description: 'Machine learning models',
    price: '$250',
    iconColor: 'text-purple-500',
    iconBgColor: 'bg-purple-600/10',
  },
  {
    name: 'VPS Hosting',
    description: '24/7 cloud hosting',
    price: '$30',
    priceLabel: '/mo',
    iconColor: 'text-green-500',
    iconBgColor: 'bg-green-600/10',
  },
  {
    name: '1-on-1 Training',
    description: 'Personal strategy coaching',
    price: '$50',
    priceLabel: '/hr',
    iconColor: 'text-yellow-500',
    iconBgColor: 'bg-yellow-600/10',
  },
];

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Strategy Complexity', starter: 'Basic', professional: 'Advanced', enterprise: 'Unlimited' },
  { feature: 'Backtesting Period', starter: '1 Year', professional: '5 Years', enterprise: '10+ Years' },
  { feature: 'Broker Integrations', starter: '1', professional: '3', enterprise: 'Unlimited' },
  { feature: 'Support Duration', starter: '30 Days', professional: '90 Days', enterprise: '1 Year+' },
  { feature: 'Performance Dashboard', starter: false, professional: true, enterprise: true },
  { feature: 'Risk Management', starter: 'Basic', professional: 'Advanced', enterprise: 'Institutional' },
  { feature: 'Source Code', starter: true, professional: true, enterprise: true },
];
