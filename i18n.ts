import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (context) => {
  const locale = context.locale || 'en'; // Define un idioma por defecto
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return { messages: {} }; // Retorna un objeto vacío si falla
  }
});
