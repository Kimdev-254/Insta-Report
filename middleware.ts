import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    '/reports',
    '/generate',
    '/preview',
    '/profile',
    '/settings',
    '/api/reports',
    '/api/payments'
  ]

  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth',
    '/reset-password',
    '/',
    '/about',
    '/contact'
  ]

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )
  
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // If no session and trying to access protected routes
  if (!session && isProtectedRoute) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL('/auth', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If session exists and trying to access auth page
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/reports', req.url))
  }

  // Add security headers
  const headers = new Headers(res.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return NextResponse.next({
    request: {
      headers: headers,
    },
  })
}
