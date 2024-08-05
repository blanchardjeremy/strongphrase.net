/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['Raleway', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        'mono': ['"Roboto Mono"', 'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      fontWeight: {
        extrabold: 800,
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  daisyui: {
    themes: ["emerald"],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
}