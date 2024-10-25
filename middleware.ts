import createMiddleware from 'next-intl/middleware';

// Crear el middleware de internacionalización
export default createMiddleware({
  // Una lista de todos los locales que se admiten
  locales: ['en', 'es'],
  
  // Si no se encuentra ninguna configuración regional en la ruta, se utiliza esta configuración regional predeterminada
  defaultLocale: 'en',

  // Configuración para el modo de detección automática de idioma
  localeDetection: true,

  // Configuración para el prefijo de localización
  localePrefix: 'always'
});

// Configuración para el middleware
export const config = {
  // Coincide con todas las rutas excepto las que comienzan con: api, _next, _vercel, y archivos estáticos como favicon.ico, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
