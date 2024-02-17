import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const isLoggedIn = Boolean(req.cookies.get('next-auth.session-token'));
    const url = req.nextUrl;
    const { pathname } = url;

    console.log(isLoggedIn);
    console.log(req.cookies);

    if (pathname.startsWith(`/api/`)) {
        if (req.headers.get('sec-fetch-site') == 'none') {
            return NextResponse.rewrite(new URL('/not-found', req.url));
        }
    }

    if (!isLoggedIn && req.url == 'http://localhost:3000/profile') {
        return NextResponse.redirect('http://localhost:3000/board');
    }
    // if (!isLoggedIn && req.url == 'https://bosyuu.netlify.app/profile') {
    //     return NextResponse.redirect('https://bosyuu.netlify.app/board');
    // }
    if (!isLoggedIn && req.url == 'https://bosyuu.vercel.app/profile') {
        return NextResponse.redirect('https://bosyuu.vercel.app/board');
    }

    if (
        req.url === 'http://localhost:3000/' ||
        req.url === 'http://localhost:3000'
    ) {
        return NextResponse.redirect('http://localhost:3000/board');
    }
    if (
        req.url === 'https://bosyuu.netlify.app/' ||
        req.url === 'https://bosyuu.netlify.app'
    ) {
        return NextResponse.redirect('https://bosyuu.netlify.app/board');
    }
    if (
        req.url === 'https://bosyuu.vercel.app/' ||
        req.url === 'https://bosyuu.vercel.app'
    ) {
        return NextResponse.redirect('https://bosyuu.vercel.app/board');
    }

    return NextResponse.next();
}
