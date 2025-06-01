/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'glow': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': {
            textShadow: '0 0 10px #60a5fa, 0 0 20px #60a5fa, 0 0 40px #3b82f6',
            color: '#cbd5e1',
          },
          '50%': {
            textShadow: '0 0 20px #93c5fd, 0 0 30px #60a5fa, 0 0 60px #3b82f6',
            color: '#e0f2fe',
          },
        },
      },
      boxShadow: {
        'aura': '0 0 8px #60a5fa, 0 0 20px #3b82f6',
      },
      transitionProperty: {
        'glow': 'box-shadow, background-color, transform',
      },
    },
  },
  plugins: [],
};