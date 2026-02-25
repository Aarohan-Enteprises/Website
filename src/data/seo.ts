export const siteConfig = {
  name: 'PineCoder.in',
  url: 'https://pinecoder.in',
  ogImage: 'https://pinecoder.in/og-image.jpg',
  description: 'PineCoder.in provides professional trading strategy automation services in India. Build, backtest, and deploy algo trading strategies with TradingView, Python, and advanced risk management.',
  keywords: 'algo trading India, trading automation, strategy development, TradingView automation, Python trading, automated algorithmic trading services, PineCoder.in, trading bot development',
  author: 'PineCoder FinTech',
  phone: '+91-7499462967',
  email: 'contact@pinecoder.in',
  whatsapp: 'https://wa.me/917499462967',
  location: 'Nagpur, Maharashtra, India',
  legalName: 'Aarohan Enterprises',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PineCoder FinTech',
  legalName: 'Aarohan Enterprises',
  url: 'https://pinecoder.in',
  logo: 'https://pinecoder.in/logo-square-dark-theme.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7499462967',
    contactType: 'customer service',
    email: 'contact@pinecoder.in',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagpur',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.linkedin.com/in/chaitanya-murarka/'],
  areaServed: 'IN',
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'PineCoder FinTech',
  image: 'https://pinecoder.in/og-image.jpg',
  url: 'https://pinecoder.in',
  telephone: '+91-7499462967',
  email: 'contact@pinecoder.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagpur',
    addressRegion: 'Maharashtra',
    postalCode: '440001',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$250 - $500+',
};
