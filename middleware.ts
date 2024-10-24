import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};