import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        "dm-bg": "#111827",
        "dm-heading":"#E6E7EB",
        "dm-subheading":"#D2D5DC",
        "lm-bg": "#F3F4F6",
        "lm-heading":"#111827",
        "lm-subheading":"#202937"
      }
    },
  },
  plugins: [],
}
export default config
