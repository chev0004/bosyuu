import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { Rokkitt } from 'next/font/google';
import { AuthProvider } from './Providers';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';
import { fetchVictimData } from '@/libs/getVictim';
import RegisterPrompt from './components/RegisterPrompt';

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

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const victimData = await fetchVictimData();
	const session = await getServerSession(authOptions);
	let colour: string = '#707070';
	const victimGender = victimData?.gender;
	victimGender == '1'
		? (colour = '#c1d5e9')
		: victimGender === '2'
		? (colour = '#f9a8d5')
		: (colour = '#707070');
	return (
		<html lang="en">
			<AuthProvider>
				<body className={`${rokkitt.className} bg-back`}>
					<NextTopLoader color={colour} showSpinner={false} />
					<Navbar icon={session?.user?.image} />
					{session && <RegisterPrompt victimData={victimData} />}
					{children}
				</body>
			</AuthProvider>
		</html>
	);
};

export default RootLayout;
