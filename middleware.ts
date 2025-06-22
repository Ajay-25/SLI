// middleware.js
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

//routing
import { routing } from '@lib/i18n/routing';

import { geolocation } from '@vercel/functions';

const MIDDLE_EAST_COUNTRIES = [
  'BH',
  'CY',
  'EG',
  'IR',
  'IQ',
  'IL',
  'JO',
  'KW',
  'LB',
  'OM',
  'PS',
  'QA',
  'SA',
  'SY',
  'TR',
  'AE',
  'YE',
];

const RESTRICTED_COUNTRIES = ['IN', ...MIDDLE_EAST_COUNTRIES];

export function middleware(request: NextRequest) {
  const country = geolocation(request)?.country || 'US';
  const url = request.nextUrl.clone();
  console.log('country', country);

  // Exclude requests for static assets and favicons
  if (
    url.pathname.startsWith('/_next/') || // Static assets (like JavaScript, CSS)
    url.pathname.startsWith('/api/') || // API routes
    url.pathname === '/favicon.ico' || // Favicon
    url.pathname.startsWith('/static/') // Custom static folder
  ) {
    return NextResponse.next(); // Don't redirect static file requests
  }

  // Redirect based on country
  // if (
  //   RESTRICTED_COUNTRIES.includes(country) &&
  //   !url.pathname?.includes('/not-available')
  // ) {
  //   url.pathname = '/not-available';
  //   return NextResponse.redirect(url);
  // }

  const intlMiddleware = createMiddleware(routing);
  const intlResponse = intlMiddleware(request);

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
