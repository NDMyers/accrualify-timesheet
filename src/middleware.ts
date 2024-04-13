import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// Must be named middleware.ts for next.js

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname

        // Manage routes protection
        const isAuth = await getToken({ req })
        // Starts route at login page for authentication
        const isLoginPage = pathname.startsWith('/login')

        // Denotes dashboard as sensitve -> must be authenticated via google to access
        const sensitiveRoutes = ['/dashboard']
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route))

        if( isLoginPage ) {
            if( isAuth ) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            return NextResponse.next()
        }

        if( !isAuth && isAccessingSensitiveRoute ) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        // Auto redirect base '/' page to '/dashboard' page if authenticated
        if( pathname === '/' ) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }, {
        callbacks: {
            async authorized() {
                return true
            },
        },
    }
)

export const config = {
    matcher: ['/','/login','/dashboard/:path*']
}