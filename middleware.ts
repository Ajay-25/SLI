import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('authStatus');
  // console.log('request', request);
  // console.log('token', token);
  // console.log('request.cookies', request.cookies);
  // const cookies = document.cookie;
  // console.log('cookies', cookies);
  //
  // if (!token) {
  //   const loginUrl = new URL('https://sangat.sos.org/Forwarder');
  //
  //   // const loginUrl = new URL(
  //   //   `https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
  //   //     request.nextUrl.href,
  //   //   )}`,
  //   // );
  //   loginUrl.searchParams.set('RedirectTo', request.nextUrl.href); // Pass current URL as redirect
  //
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}
