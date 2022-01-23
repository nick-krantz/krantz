module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      height: {
        '60%': '60%',
      },
      gridTemplateColumns: {
        'recipe-grid': 'repeat(auto-fit, minmax(240px, 1fr))',
        'recipe-grid-sm': 'repeat(auto-fit, minmax(180px, 1fr))',
      },
      gridTemplateRows: {
        'recipe-card': 'repeat(2, 160px)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
