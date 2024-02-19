import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const isLoggedIn = Boolean(
        req.cookies.get('__Secure-next-auth.session-token')
    );
    const url = req.nextUrl;
    const { pathname } = url;

    if (pathname.startsWith(`/api/`)) {
        if (req.headers.get('sec-fetch-site') == 'none') {
            return NextResponse.rewrite(new URL('/not-found', req.url));
        }
    }

    if (
        req.headers.get('sec-fetch-site') == 'cross-site' &&
        pathname.startsWith('/profile')
    ) {
        return NextResponse.redirect(new URL('/board', req.url));
    }

    if (!isLoggedIn && pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/board', req.url));
    }

    if (pathname === '/' || pathname === '/board/search') {
        return NextResponse.redirect(new URL('/board', req.url));
    }

    return NextResponse.next();
}
