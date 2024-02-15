import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { Rokkitt } from 'next/font/google';
import { AuthProvider } from './Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

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
                    <Navbar icon={session?.user?.image} />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
};

export default RootLayout;
