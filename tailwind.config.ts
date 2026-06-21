import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial finance palette — FT-salmon paper, warm ink, pine accent.
        paper: '#FBEDE0',        // base salmon page
        band: '#F4DFCD',         // deeper salmon for alternating sections
        surface: '#FFF8F1',      // raised cards / inputs
        ink: '#221A12',          // primary text (warm near-black)
        'ink-soft': '#6E5C4B',   // secondary text
        'ink-faint': '#9C8975',  // captions / tertiary
        rule: '#E3D0BB',         // hairline rules & borders
        'rule-strong': '#CDB295',
        pine: '#0E5C4A',         // single accent — deep pine teal
        'pine-dark': '#0A4236',
        'pine-tint': '#E2ECE7',  // accent wash background
        // Market semantics — used ONLY for real prices / P&L.
        up: '#1B7A4B',
        down: '#BE3A28',
        // Legacy aliases kept so older references degrade gracefully.
        primary: '#221A12',
        secondary: '#0E5C4A',
        accent: '#1B7A4B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
