import createMiddleware from 'next-intl/middleware';

// Crea el middleware para manejar la internacionalización
export default createMiddleware({
  // Define los idiomas soportados
  locales: ['en', 'es'],
  // Establece el idioma por defecto
  defaultLocale: 'es'
});

// Configura el matcher para aplicar el middleware solo a las rutas necesarias
export const config = {
  // Aplica el middleware a todas las rutas excepto las de API, archivos estáticos y Vercel
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
