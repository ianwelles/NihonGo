/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF1744',
        'accent': '#82b1ff',
        'bg': '#000000',
        'card-bg': '#1c1c1c',
        'border': '#444',
        'text': '#ffffff',
        'sub-text': '#dddddd',
        'popup-bg': '#1c1c1c',
        'popup-btn': '#8ab4f8',
        'popup-text': '#202124',
        'sight-rec-teal': '#00BCD4',
        'food-rec-pink': '#F48FB1',
        'shopping-gold': '#FFD700',
        'amber-200': '#fcd34d',
        'amber-500': '#f59e0b',
      },
      boxShadow: {
        'custom': '0 4px 8px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],     // increased from 0.75rem
        'sm': ['1rem', { lineHeight: '1.5rem' }],       // increased from 0.875rem
        'base': ['1.125rem', { lineHeight: '1.75rem' }],   // increased from 1rem
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],    // increased from 1.125rem
        'xl': ['1.5rem', { lineHeight: '2rem' }],       // increased from 1.25rem
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],    // increased from 1.5rem
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],      // increased from 1.875rem
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
