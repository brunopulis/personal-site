export default {
  darkMode: 'class',
  content: ['./src/**/*.{njk,md,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#610404',
        secondary: '#849cdb',
        neutral: '#171e1e',
        outline: '#d9d9d9'
      },
      maxWidth: {
        prose: '64ch'
      }
    }
  },
  plugins: []
};
