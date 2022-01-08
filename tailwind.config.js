module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      padding: {
        '60%': '60%',
      },
      gridTemplateColumns: {
        'recipe-grid': 'repeat(auto-fit, minmax(240px, 1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
