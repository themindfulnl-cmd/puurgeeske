import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

/**
 * Guards the admin surface at the edge, before any page or layout renders.
 * Previously each page checked on its own and the check itself was bypassable.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page and its API must stay reachable while logged out.
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  // API calls get a status, humans get the login page.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  const response = NextResponse.redirect(loginUrl);
  // Clear whatever unusable cookie was presented.
  if (token) response.cookies.delete(SESSION_COOKIE);
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
