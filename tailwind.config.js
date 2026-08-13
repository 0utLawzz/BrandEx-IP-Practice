/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BrandEx Neo-Brutalism Color Palette
        brandex: {
          bg2: '#0C0C0C',
          border: '#0C0C0C',
          black: '#0C0C0C',
          bg: '#F0E8D0',
          'panel-hover': '#F0E8D0',
          'bg-alt': '#E8DFC7',
          panel: '#232323',
          accent: '#C94A00',
          'accent-primary': '#C94A00',
          accent4: '#0A6B52',
          teal: '#0A6B52',
          accent2: '#0D9970',
          'teal-lt': '#0D9970',
          accent3: '#D4A800',
          yellow: '#D4A800',
          surface: '#FAF6EE',
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'Arial Black', 'Arial', 'sans-serif'],
        'space': ['Space Grotesk', 'Arial', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
      borderRadius: {
        'neo-sm': '0px',
        'neo-md': '6px',
        'neo-lg': '6px',
      },
      boxShadow: {
        'neo': '5px 5px 0 #0C0C0C',
        'neo-sm': '3px 3px 0 #0C0C0C',
        'neo-lg': '8px 8px 0 #0C0C0C',
        'neo-accent': '5px 5px 0 #C94A00',
        'neo-hover': '7px 7px 0 #0C0C0C',
      },
      borderWidth: {
        'neo-thin': '2px',
        'neo-thick': '2.5px',
        'neo-card': '3px',
      },
    },
  },
}
