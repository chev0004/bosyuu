import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { Rokkitt } from 'next/font/google';
import { AuthProvider } from './Providers';

const rokkitt = Rokkitt({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='en'>
            <AuthProvider>
                <body className={rokkitt.className}>
                    <Navbar />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
};

export default RootLayout;
