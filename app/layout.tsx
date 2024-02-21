import './globals.css';
import type { Metadata } from 'next';
import { victim } from './board/page';
import Navbar from './components/Navbar';
import { Rokkitt } from 'next/font/google';
import { AuthProvider } from './Providers';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';

const rokkitt = Rokkitt({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Bosyuu',
    description: 'Discord friend bulletin board',
    keywords: [
        'Discord',
        'Discord friends',
        'Discord bulletin board',
        'Discord friend board',
    ],
};

let victimData: victim;

const getVictim = async () => {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        `https://bosyuu.netlify.app/api/victims/${session?.user?.profile.id}`
    );
    victimData = (await res?.json()).victim;
};

export const fetchVictimData = async () => {
    if (!victimData) {
        await getVictim();
    }
    return victimData;
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    let colour: string = '#707070';
    const victimData = await fetchVictimData();
    const session = await getServerSession(authOptions);
    victimData?.gender == '1'
        ? (colour = '#c1d5e9')
        : victimData?.gender === '2'
        ? (colour = '#f9a8d5')
        : (colour = '#707070');
    return (
        <html lang='en'>
            <AuthProvider>
                <body className={`${rokkitt.className} bg-back`}>
                    <NextTopLoader color={colour} showSpinner={false} />
                    <Navbar icon={session?.user?.image} />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
};

export default RootLayout;
