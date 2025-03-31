/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f3eb',
          100: '#e8e0c8',
          200: '#d9cda5',
          300: '#cbba82',
          400: '#bca75f',
          500: '#b29446',
          600: '#a88131',
          700: '#9d6f1c',
          800: '#925c07',
          900: '#874900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out forwards',
        fadeInDown: 'fadeInDown 0.8s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        bounce: 'bounce 1.5s infinite',
        gradientFlow: 'gradientFlow 5s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      textShadow: {
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
        sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      transitionDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.animation-delay-300': {
          animationDelay: '300ms',
        },
        '.animation-delay-600': {
          animationDelay: '600ms',
        },
        '.animation-delay-900': {
          animationDelay: '900ms',
        },
      };
      addUtilities(newUtilities);
    }
  ],
}