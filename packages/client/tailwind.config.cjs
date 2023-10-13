const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    screens: {
      xs: '480px',
      ...screens
    }
  }
}
