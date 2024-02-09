import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
        return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
    }

    return NextResponse.next();
}
