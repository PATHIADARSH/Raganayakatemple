/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'temple-red': '#8B3A3A',
        'temple-maroon': '#6B2C2C',
        'temple-gold': '#D4AF37',
        'temple-saffron': '#FF9933',
        'temple-green': '#1B4D3E',
        'temple-cream': '#F5F0E8',
        'temple-dark': '#1A1A1A',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'telugu': ['Noto Serif Telugu', 'serif'],
      },
    },
  },
  plugins: [],
};
