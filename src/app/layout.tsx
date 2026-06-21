import type { Metadata } from 'next';
import { Fraunces, Schibsted_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { GA_ID } from '@/lib/analytics';
import { siteConfig, organizationSchema, localBusinessSchema } from '@/data/seo';

// Editorial serif display — the masthead voice.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

// News-grade grotesque for body copy.
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// Tabular mono for tickers, prices, labels and captions.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Aarohan Enterprises - Professional Trading Strategy Automation Services',
    template: '%s | Aarohan Enterprises',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'Aarohan Enterprises - Professional Trading Strategy Automation Services',
    description: "Transform your trading ideas into automated strategies. India's premier automated algorithmic trading development company.",
    images: [siteConfig.ogImage],
    siteName: siteConfig.name,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarohan Enterprises - Professional Trading Strategy Automation Services',
    description: "Transform your trading ideas into automated strategies. India's premier automated algorithmic trading development company.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${schibsted.variable} ${plexMono.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-body bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
