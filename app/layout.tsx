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
import { Suspense } from 'react';

const rokkitt = Rokkitt({ subsets: ['latin'] });

//metadata
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

//color calculation
const getColorByGender = (gender: string | undefined) => {
	switch (gender) {
		case '1':
			return '#c1d5e9';
		case '2':
			return '#f9a8d5';
		default:
			return '#707070';
	}
};

//loading component
const LoadingFallback = () => (
	<div className="flex items-center justify-center min-h-screen">
		<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
	</div>
);

const RootLayout = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	//parallel data fetching
	const [victimData, session] = await Promise.all([
		fetchVictimData(),
		getServerSession(authOptions),
	]);

	const colour = getColorByGender(victimData?.gender);

	return (
		<html lang="en">
			<AuthProvider>
				<body className={`${rokkitt.className} bg-back`}>
					<NextTopLoader color={colour} showSpinner={false} />
					<Navbar icon={session?.user?.image} />
					<Suspense fallback={<LoadingFallback />}>
						{session && <RegisterPrompt victimData={victimData} />}
						{children}
					</Suspense>
				</body>
			</AuthProvider>
		</html>
	);
};

export default RootLayout;
