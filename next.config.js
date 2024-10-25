const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus otras configuraciones aquí
};

module.exports = withNextIntl(nextConfig);
