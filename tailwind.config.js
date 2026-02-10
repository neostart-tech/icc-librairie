module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#6a0d5f',
          DEFAULT: '#0080ff',
        },      
        secondary: '#fa5d4a',
        success: '#2ea867',
        warning: '#f2880f',
        danger: '#fa5d4a',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        'sans': ['"Open Sans"', '"Lato"', 'sans-serif'],
      },
      screens: {
        'xl': '1500px',
        'lg': '1192px',
        'md': '768px',
        'sm': '576px',
      }
    },
  },
  plugins: [],
}