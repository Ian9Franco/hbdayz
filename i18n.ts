import { getRequestConfig } from 'next-intl/server';

// Configura la carga de mensajes para next-intl
export default getRequestConfig(async ({ locale }) => ({
  // Carga los mensajes para el idioma especificado
  messages: (await import(`./messages/${locale}.json`)).default
}));
