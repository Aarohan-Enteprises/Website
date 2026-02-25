export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  priceLabel: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
  iconColor: string;
  borderColor: string;
}

export interface AddOn {
  name: string;
  description: string;
  price: string;
  priceLabel?: string;
  iconColor: string;
  iconBgColor: string;
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}
