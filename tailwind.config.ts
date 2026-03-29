import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0f172a',
          text: '#0f172a',
          muted: '#475569',
          line: '#e2e8f0',
          soft: '#f8fafc'
        }
      }
    }
  },
  plugins: []
};

export default config;
