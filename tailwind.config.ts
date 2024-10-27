import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default font for body text
        oswald: ['Oswald', 'sans-serif'], // Oswald font for titles and names
      },
      // Add Oswald font variables
      fontSize: {
        // Puedes ajustar estos valores según tus necesidades de diseño
        'oswald-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'oswald-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],
        'oswald-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.05em' }],
        'oswald-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],
        'oswald-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],
        'oswald-2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.05em' }],
        'oswald-3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.05em' }],
        'oswald-4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.05em' }],
        'oswald-5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'oswald-6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'oswald-7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'oswald-8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'oswald-9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.05em' }],
      },
      // Existing color configuration
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      // Existing border radius configuration
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
