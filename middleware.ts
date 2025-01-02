// middleware.js
import { NextResponse, NextRequest } from 'next/server';

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
  const country = request.geo?.country || 'US';
  const url = request.nextUrl.clone();
  console.log('country', country);

  // Exclude requests for static assets and favicons
  // if (
  //   url.pathname.startsWith('/_next/') || // Static assets (like JavaScript, CSS)
  //   url.pathname.startsWith('/api/') || // API routes
  //   url.pathname === '/favicon.ico' || // Favicon
  //   url.pathname.startsWith('/static/') // Custom static folder
  // ) {
  //   return NextResponse.next(); // Don't redirect static file requests
  // }

  // Redirect based on country
  // if (
  //   RESTRICTED_COUNTRIES.includes(country) &&
  //   !url.pathname?.includes('/not-available')
  // ) {
  //   url.pathname = '/not-available';
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Match all paths
};
