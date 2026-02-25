export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Tools', href: '/#tools' },
  { label: 'Assessment', href: '/assessment' },
];

export const footerQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const footerResourceLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'FAQ', href: '/contact#faq' },
  { label: 'Assessment', href: '/assessment' },
];

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Refund Policy', href: '/refund-policy' },
];
