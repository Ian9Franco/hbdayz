import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "./components/theme-provider";
import ToggleMenu from './components/toggleMenu';
import "../../styles/globals.css";
import { setRequestLocale } from 'next-intl/server';

// Configuración de la fuente Inter
const inter = Inter({ subsets: ['latin'] })

// Metadatos de la aplicación
export const metadata: Metadata = {
  title: "Recordatorio de Cumpleaños",
  description: "Una aplicación simple para recordar cumpleaños",
};

// Genera los parámetros estáticos para los idiomas soportados
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

// Componente principal del layout
export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Establecer el locale para la solicitud actual
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <div className="container mx-auto px-4 py-8 max-w-3xl mt-8">
                {children}
                <ToggleMenu currentLocale={locale} />
              </div>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Añadimos animaciones de entrada suaves para cada sección
// Mejoramos la apariencia de los avatares con sombras y efectos hover
// Implementamos un efecto de escala suave al pasar el mouse por los elementos
// Utilizamos colores de la paleta definida en Tailwind para mantener la consistencia