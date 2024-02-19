import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { Rokkitt } from 'next/font/google';
import { AuthProvider } from './Providers';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';

const rokkitt = Rokkitt({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Bosyuu - Board',
    description: 'Discord friend bulletin board',
    keywords: [
        'Discord',
        'Discord friends',
        'Discord bulletin board',
        'Discord friend board',
    ],
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await getServerSession(authOptions);
    return (
        <html lang='en'>
            <AuthProvider>
                <body className={`${rokkitt.className} bg-back`}>
                    <NextTopLoader color='#c1d5e9' showSpinner={false} />
                    <Navbar icon={session?.user?.image} />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
};

export default RootLayout;
