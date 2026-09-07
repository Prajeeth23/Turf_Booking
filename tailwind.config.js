/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080e14",
        pitch: {
          dark: "#050b08",
          darker: "#030705",
          surface: "#09170f",
          card: "#0d2015",
          cardHover: "#132c1e",
          border: "#1a4029",
          borderLight: "#275c3d",
          borderGlow: "rgba(74, 222, 128, 0.35)",
        },
        turf: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        brand: {
          green: "#22c55e",
          electric: "#4ade80",
          neon: "#39ff14",
          emerald: "#10b981",
          dark: "#081c10",
        }
      },
      fontFamily: {
        hero: ['"Anton"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        sporty: ['"Outfit"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(34, 197, 94, 0.45)',
        'glow-lg': '0 0 50px rgba(34, 197, 94, 0.65)',
        'card-dark': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
        'neon': '0 0 20px rgba(74, 222, 128, 0.6)',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(5, 11, 8, 0.4) 0%, rgba(5, 11, 8, 0.85) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(13, 32, 21, 0.85) 0%, rgba(7, 18, 12, 0.9) 100%)',
      }
    },
  },
  plugins: [],
}
