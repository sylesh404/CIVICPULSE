/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F3F2EC',
          light: '#FAF9F5',
          dark: '#EAE8DE',
        },
        ink: {
          DEFAULT: '#050505',
          soft: '#222222',
          muted: '#666666',
        },
        acid: {
          DEFAULT: '#DFFF00',
          hover: '#C8E600',
        },
        slate: {
          raw: '#B9B9B2',
          line: '#D2D2CA',
        },
        status: {
          critical: '#E53935',
          high: '#F59E0B',
          medium: '#050505',
          low: '#10B981',
        }
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter Tight"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        DEFAULT: '0px',
      }
    },
  },
  plugins: [],
}
