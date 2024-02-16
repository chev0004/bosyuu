import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const isLoggedIn = Boolean(req.cookies.get('next-auth.session-token'));
    const url = req.nextUrl;
    const { pathname } = url;

    if (pathname.startsWith(`/api/`)) {
        if (req.headers.get('sec-fetch-site') == 'none') {
            return NextResponse.error();
        }
    }

    if (!isLoggedIn && req.url == 'http://localhost:3000/profile') {
        return NextResponse.redirect('http://localhost:3000/board');
    }

    if (
        req.url === 'http://localhost:3000/' ||
        req.url === 'http://localhost:3000'
    ) {
        return NextResponse.redirect('http://localhost:3000/board');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile', '/api/:path*'],
};
