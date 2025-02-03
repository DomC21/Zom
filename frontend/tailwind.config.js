/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'tiny': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        primary: '#00E5FF',
        secondary: '#0099FF',
        background: '#000000',
        foreground: '#FFFFFF',
        muted: '#666666',
        accent: {
          DEFAULT: '#00E5FF',
          hover: '#4FFBFF',
          light: '#4FFBFF',
          muted: '#00B3CC'
        },
        card: {
          DEFAULT: 'rgba(0, 0, 0, 0.95)',
          hover: 'rgba(0, 229, 255, 0.05)',
          border: 'rgba(0, 229, 255, 0.1)'
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'accent-start': '#00E5FF',
        'accent-end': '#0099FF',
      },
      spacing: {
        container: '2rem',
        section: '4rem'
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.2)' }
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  fontFamily: {
    sans: ['Poppins', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    'heading-1': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
    'heading-2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
    'heading-3': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
    'heading-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
    'body-large': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
    'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    'tiny': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
  },
  boxShadow: {
    card: '0 4px 6px -1px rgba(0, 229, 255, 0.1), 0 2px 4px -1px rgba(0, 229, 255, 0.06)',
    'card-hover': '0 10px 15px -3px rgba(0, 229, 255, 0.2), 0 4px 6px -2px rgba(0, 229, 255, 0.1)',
  },
}

