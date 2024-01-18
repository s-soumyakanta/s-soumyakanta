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
        "dm-bg": " #18171D",
        "dm-heading":"#E4E3E8",
        "dm-subheading":"#D5D4D9",
        "lm-bg": "#F4F4F6",
        "lm-heading":"#18171D",
        "lm-subheading":"#27262B"
      }
    },
  },
  plugins: [],
}
export default config
