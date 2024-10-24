import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({params}) => {
  const locale = params?.locale || 'en'; // Define un idioma por defecto
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {messages};
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {messages: {}};  // Devuelve un objeto vacío para evitar errores
  }
});
