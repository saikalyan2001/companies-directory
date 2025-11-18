/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft white color palette for light mode
        'ghost-white': '#F7F8FA',
        'smoke-white': '#F5F5F5',
        'soft-gray': '#F0F1F3',
        'alabaster': '#FAFAFA',
        
        // Semantic colors
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
    },
  },
  plugins: [],
}
