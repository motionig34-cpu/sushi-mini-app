/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        card: '#1A1A1A',
        border: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        heartPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.45)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        checkmark: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        btnPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.92)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        heartPop: 'heartPop 0.3s ease-in-out',
        slideUp: 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1)',
        fadeIn: 'fadeIn 0.2s ease-in-out',
        checkmark: 'checkmark 0.55s ease-in-out forwards',
        btnPulse: 'btnPulse 0.15s ease-in-out',
      },
    },
  },
  plugins: [],
}
