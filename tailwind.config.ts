import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cool-1': 'url("/Graphics/Home Page - 4 Categories/Background/v01_wave-09 copy.jpg")',
        'cool-2': 'url("/Graphics/Home Page - 4 Categories/Background/v01_wave-10 copy.jpg")',
        'cool-3': 'url("/Graphics/Home Page - 4 Categories/Background/v01_wave-14 copy.jpg")',
        'cool-4': 'url("/Graphics/Home Page - 4 Categories/Background/v01_wave-16.jpg")',
        'homesquare': 'url("/Graphics/Home Page - 4 Categories/Background/col.png")',
        "home": 'url("/background/bg-home-1.png")',
        "mnote": 'url("/Graphics/Home Page -  2 floating Icons/Music Notes.png")',
        "swave": 'url("/Graphics/Home Page -  2 floating Icons/Sound Waves.png")',
        
      },
      colors:{
        "action-bg": "#1F1F2C",
        "pending-bg": "#F7F7F7",
        "primary-border": "#E5E5E5",
        "primary-border-dark": "#28303F",
        "primary-text": "#3749E9",
        "disabled-text": "#565660",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
  }
}
export default config
