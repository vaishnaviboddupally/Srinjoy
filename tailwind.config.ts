import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        charcoal: '#1C1C1C',
        terracotta: '#C4714A',
        sage: '#8A9E8B',
        offwhite: '#FAF8F4',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        arrowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        marqueeScroll: 'marqueeScroll 32s linear infinite',
        arrowBounce: 'arrowBounce 1.6s ease-in-out infinite',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.writing-vertical': {
          'writing-mode': 'vertical-rl',
          'text-orientation': 'mixed',
        },
      })
    }),
  ],
}

export default config
