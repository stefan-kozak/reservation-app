module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
    safelist: [
      'grid-cols-1',
      'grid-cols-2',
      'grid-cols-3',
      'grid-cols-4',
      'grid-cols-5',
      'grid-cols-6',
      'grid-cols-7',
      'grid-cols-8',
      'grid-cols-9',
      'grid-cols-10'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
