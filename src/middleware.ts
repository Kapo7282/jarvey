import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from '@/lib/constants/routes'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('auth_token')

  // Public routes that don't require authentication
  const publicRoutes = [ROUTES.SIGNUP]
  if (publicRoutes.includes(pathname as any)) {
    return NextResponse.next()
  }

  // // Redirect to signup if not authenticated
  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL(ROUTES.SIGNUP, request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}