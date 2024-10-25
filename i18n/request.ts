import { getRequestConfig } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

// Configuración de la solicitud para next-intl
export default getRequestConfig(async ({ locale }) => {
  // Establecer el idioma de la solicitud
  setRequestLocale(locale);
  
  // Cargar los mensajes para el idioma actual
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});