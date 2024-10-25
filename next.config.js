const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus otras configuraciones aquí
};

module.exports = withNextIntl(nextConfig);