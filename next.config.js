const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita el modo estricto de React para mejorar la detección de errores
  reactStrictMode: true,
  // Utiliza SWC para la minificación, lo que puede mejorar el rendimiento de la compilación
  swcMinify: true,
  // Genera una build independiente que puede ser desplegada sin depender de un servidor Node.js
  output: 'standalone',
  experimental: {
    // Habilita el nuevo App Router de Next.js
    appDir: true,
  },
};

// Exporta la configuración envuelta con el plugin de next-intl
module.exports = withNextIntl(nextConfig);
