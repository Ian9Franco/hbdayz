import { getRequestConfig, setRequestLocale } from 'next-intl/server';

// Configuración de la solicitud para next-intl
export default getRequestConfig(async ({ locale }) => {
  // Establecer el idioma de la solicitud
  setRequestLocale(locale);

  try {
    // Cargar los mensajes para el idioma actual
    const messages = (await import(`../messages/${locale}.json`)).default;

    return {
      messages,
    };
  } catch (error) {
    console.error(`Error al cargar los mensajes para el idioma ${locale}:`, error);
    return {
      messages: {}, // Devuelve un objeto vacío si no se encuentran los mensajes
    };
  }
});
