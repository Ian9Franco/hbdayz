import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default function NotFoundPage() {
  const locale = 'es'; // Default to Spanish
  let messages;
  try {
    messages = require(`../messages/${locale}.json`);
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </NextIntlClientProvider>
  );
}