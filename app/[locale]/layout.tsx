import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "./components/theme-provider";
import ToggleMenu from './components/toggleMenu';
import "../../styles/globals.css";
import { setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Recordatorio de Cumpleaños",
  description: "Una aplicación simple para recordar cumpleaños",
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`antialiased font-sans ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              {children}
              <ToggleMenu currentLocale={locale} />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}