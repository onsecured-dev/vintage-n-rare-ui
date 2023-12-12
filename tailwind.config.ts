import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
        
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    themes:[],
  }
}
export default config
