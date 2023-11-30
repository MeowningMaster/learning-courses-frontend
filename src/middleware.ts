import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './utilities/auth'

export async function middleware(request: NextRequest) {
  if (!(await auth.get())) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
  ],
}
