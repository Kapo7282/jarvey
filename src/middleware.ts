//import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // const session = await auth()
  // const { pathname } = request.nextUrl
  
  // // Public routes that don't need authentication
  // const publicRoutes = ['/', '/login', '/signup']
  // const isPublicRoute = publicRoutes.includes(pathname)

  // // Auth routes that should redirect to dashboard if user is authenticated
  // const authRoutes = ['/login', '/signup']
  // const isAuthRoute = authRoutes.includes(pathname)

  // // Allow all auth-related API routes
  // if (pathname.startsWith('/api/auth')) {
  //   return NextResponse.next()
  // }

  // if (isAuthRoute && session) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  // if (!isPublicRoute && !session) {
  //   const url = new URL('/login', request.url)
  //   url.searchParams.set('callbackUrl', pathname)
  //   return NextResponse.redirect(url)
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
  ]
}