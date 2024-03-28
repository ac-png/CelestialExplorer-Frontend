/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.tsx',
    './src/components/*.tsx',
    './src/pages/*.tsx',
    './src/pages/auth/*.tsx',
    './src/pages/observations/*.tsx',
    './src/pages/celestialBodies/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

