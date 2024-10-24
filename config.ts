export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default
export const pathnames = {
  '/': '/',
  '/birthdays': {
    en: '/birthdays',
    es: '/cumpleanos',
  },
  // Add more routes as needed
} as const;