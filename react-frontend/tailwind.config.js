/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-bg': '#08080C',
        'luxury-surface': '#111115',
        'luxury-text-primary': '#F4F4F5',
        'luxury-text-secondary': '#9CA3AF',
        'luxury-border': 'rgba(255,255,255,0.10)',
        'luxury-gold': '#E50914',
        'luxury-success': '#10b981',
        'luxury-error': '#FF2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
