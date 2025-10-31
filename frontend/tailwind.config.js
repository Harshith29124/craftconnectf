/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: "#ec6d13",
          50: "#fef7f1",
          100: "#fef3e9",
          200: "#fce4c7",
          300: "#f7d0a1",
          400: "#f1b776",
          500: "#ec6d13",
          600: "#d8620f",
          700: "#b8520c",
          800: "#94420a",
          900: "#793708",
          950: "#412009",
        },
        
        // Neutral colors
        neutral: {
          DEFAULT: "#897261",
          50: "#FFFCF9",
          100: "#f9f7f4",
          200: "#f4f2f0",
          300: "#e8e3dd",
          400: "#d4cdc3",
          500: "#b8ac9b",
          600: "#897261",
          700: "#6b5649",
          800: "#524237",
          900: "#3c312a",
          950: "#181411",
        },
        
        // Status colors
        success: {
          DEFAULT: "#10b981",
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
        },
        error: {
          DEFAULT: "#ef4444",
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
        warning: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        info: {
          DEFAULT: "#3b82f6",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
        },
        
        // Legacy aliases (for backward compatibility)
        "primary-hover": "#d8620f",
        secondary: "#fef3e9",
        background: "#FFFCF9",
        "text-primary": "#181411",
        "text-secondary": "#897261",
        "border-color": "#f4f2f0",
      },
      
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
        '6xl': ['60px', { lineHeight: '68px' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
      },
      
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};