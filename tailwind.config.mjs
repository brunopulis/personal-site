/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,njk,md,js}', './src/**/*.svg'],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'blood-red': '#610404',
        'brand': {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc4c4',
          300: '#ff9b9b',
          400: '#ff6161',
          500: '#ff3030',
          600: '#f11111',
          700: '#cb0a0a',
          800: '#cb0a0a',
          900: '#8a1212',
          950: '#610404'
        },
        'primary': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#E2187D',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724'
        },
        'neutral': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          550: '#d9d9d9',
          600: '#d9d9d9',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        'fontFamily': {
          sans: ['Source Sans 3 Variable', ...defaultTheme.fontFamily.sans],
          headings: ['Outfit Variable', ...defaultTheme.fontFamily.sans]
        },
        'keyframes': {
          dropdown: {
            '0%': {transform: 'translateY(-1rem)', opacity: 0},
            '100%': {transform: 'translateY(0)', opacity: 1}
          },
          fadeInShadowLight: {
            '100%': {
              boxShadow: '0 20px 25px -5px rgba(15, 23, 42, .025), 0 8px 10px -6px rgba(15, 23, 42, .025);'
            }
          },
          fadeInShadowDark: {
            '100%': {
              boxShadow: '0 20px 25px -5px rgba(2, 6, 23, .25), 0 8px 10px -6px rgba(2, 6, 23, .25);'
            }
          }
        },
        'animation': {
          dropdown: 'dropdown 300ms ease-in-out forwards',
          fadeInShadowLight: 'fadeInShadowLight 500ms ease-in-out forwards',
          fadeInShadowDark: 'fadeInShadowDark 500ms ease-in-out forwards'
        },
        'typography': {
          DEFAULT: {
            css: {
              color: '#1f2937',
            a: {
              color: '#0066cc',
              '&:hover': {
                color: '#0052a3',
              },
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
            },
          }
        }
      }
    }
  },
  variants: {
    animation: ['responsive']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss/plugin')(({addVariant}) => {
      addVariant('dark-me', '.dark_&');
    })
  ]
};
