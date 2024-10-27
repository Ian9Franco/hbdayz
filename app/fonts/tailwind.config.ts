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
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        primary: {
          50: 'hsl(var(--primary-50) / <alpha-value>)',
          100: 'hsl(var(--primary-100) / <alpha-value>)',
          200: 'hsl(var(--primary-200) / <alpha-value>)',
          300: 'hsl(var(--primary-300) / <alpha-value>)',
          400: 'hsl(var(--primary-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          600: 'hsl(var(--primary-600) / <alpha-value>)',
          700: 'hsl(var(--primary-700) / <alpha-value>)',
          800: 'hsl(var(--primary-800) / <alpha-value>)',
          900: 'hsl(var(--primary-900) / <alpha-value>)',
          950: 'hsl(var(--primary-950) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          50: 'hsl(var(--secondary-50) / <alpha-value>)',
          100: 'hsl(var(--secondary-100) / <alpha-value>)',
          200: 'hsl(var(--secondary-200) / <alpha-value>)',
          300: 'hsl(var(--secondary-300) / <alpha-value>)',
          400: 'hsl(var(--secondary-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          600: 'hsl(var(--secondary-600) / <alpha-value>)',
          700: 'hsl(var(--secondary-700) / <alpha-value>)',
          800: 'hsl(var(--secondary-800) / <alpha-value>)',
          900: 'hsl(var(--secondary-900) / <alpha-value>)',
          950: 'hsl(var(--secondary-950) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        accent: {
          50: 'hsl(var(--accent-50) / <alpha-value>)',
          100: 'hsl(var(--accent-100) / <alpha-value>)',
          200: 'hsl(var(--accent-200) / <alpha-value>)',
          300: 'hsl(var(--accent-300) / <alpha-value>)',
          400: 'hsl(var(--accent-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          600: 'hsl(var(--accent-600) / <alpha-value>)',
          700: 'hsl(var(--accent-700) / <alpha-value>)',
          800: 'hsl(var(--accent-800) / <alpha-value>)',
          900: 'hsl(var(--accent-900) / <alpha-value>)',
          950: 'hsl(var(--accent-950) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        muted: {
          50: 'hsl(var(--muted-50) / <alpha-value>)',
          100: 'hsl(var(--muted-100) / <alpha-value>)',
          200: 'hsl(var(--muted-200) / <alpha-value>)',
          300: 'hsl(var(--muted-300) / <alpha-value>)',
          400: 'hsl(var(--muted-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          600: 'hsl(var(--muted-600) / <alpha-value>)',
          700: 'hsl(var(--muted-700) / <alpha-value>)',
          800: 'hsl(var(--muted-800) / <alpha-value>)',
          900: 'hsl(var(--muted-900) / <alpha-value>)',
          950: 'hsl(var(--muted-950) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        destructive: {
          50: 'hsl(var(--destructive-50) / <alpha-value>)',
          100: 'hsl(var(--destructive-100) / <alpha-value>)',
          200: 'hsl(var(--destructive-200) / <alpha-value>)',
          300: 'hsl(var(--destructive-300) / <alpha-value>)',
          400: 'hsl(var(--destructive-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          600: 'hsl(var(--destructive-600) / <alpha-value>)',
          700: 'hsl(var(--destructive-700) / <alpha-value>)',
          800: 'hsl(var(--destructive-800) / <alpha-value>)',
          900: 'hsl(var(--destructive-900) / <alpha-value>)',
          950: 'hsl(var(--destructive-950) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        success: {
          50: 'hsl(var(--success-50) / <alpha-value>)',
          100: 'hsl(var(--success-100) / <alpha-value>)',
          200: 'hsl(var(--success-200) / <alpha-value>)',
          300: 'hsl(var(--success-300) / <alpha-value>)',
          400: 'hsl(var(--success-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          600: 'hsl(var(--success-600) / <alpha-value>)',
          700: 'hsl(var(--success-700) / <alpha-value>)',
          800: 'hsl(var(--success-800) / <alpha-value>)',
          900: 'hsl(var(--success-900) / <alpha-value>)',
          950: 'hsl(var(--success-950) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          50: 'hsl(var(--warning-50) / <alpha-value>)',
          100: 'hsl(var(--warning-100) / <alpha-value>)',
          200: 'hsl(var(--warning-200) / <alpha-value>)',
          300: 'hsl(var(--warning-300) / <alpha-value>)',
          400: 'hsl(var(--warning-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          600: 'hsl(var(--warning-600) / <alpha-value>)',
          700: 'hsl(var(--warning-700) / <alpha-value>)',
          800: 'hsl(var(--warning-800) / <alpha-value>)',
          900: 'hsl(var(--warning-900) / <alpha-value>)',
          950: 'hsl(var(--warning-950) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },
        info: {
          50: 'hsl(var(--info-50) / <alpha-value>)',
          100: 'hsl(var(--info-100) / <alpha-value>)',
          200: 'hsl(var(--info-200) / <alpha-value>)',
          300: 'hsl(var(--info-300) / <alpha-value>)',
          400: 'hsl(var(--info-400) / <alpha-value>)',
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          600: 'hsl(var(--info-600) / <alpha-value>)',
          700: 'hsl(var(--info-700) / <alpha-value>)',
          800: 'hsl(var(--info-800) / <alpha-value>)',
          900: 'hsl(var(--info-900) / <alpha-value>)',
          950: 'hsl(var(--info-950) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
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