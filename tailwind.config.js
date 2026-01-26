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
        primary: '#0080ff',
        secondary: '#fa5d4a',
        success: '#2ea867',
        warning: '#f2880f',
        danger: '#fa5d4a',
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