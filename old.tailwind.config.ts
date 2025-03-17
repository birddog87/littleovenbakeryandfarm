import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
  },
  plugins: [],
}
export default config
