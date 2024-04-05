import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        sos: {
          'primary-blue': '#1C6EAA',
          'secondary-blue': '#032B4A',
          'secondary-light-blue': '#ABC7DD',
          'primary-gold': '#E1B93B',
          'secondary-dark-gold': '#B18315',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    fontSize: {
      24: '2.4rem',
      42: '4.2rem',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
