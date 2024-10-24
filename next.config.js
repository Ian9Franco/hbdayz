const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,  // Activa App Router
  },
  i18n: {
    locales: ['en', 'es'],  // Idiomas disponibles
    defaultLocale: 'en',     // Idioma por defecto
  },
};

module.exports = withNextIntl(nextConfig);
