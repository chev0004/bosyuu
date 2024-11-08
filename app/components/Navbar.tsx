'use client';

import { signOut, signIn } from 'next-auth/react';
import { Rokkitt } from 'next/font/google';
import Image from 'next/image';

const rokkitt = Rokkitt({ subsets: ['latin'] });

const Navbar = (props: any) => {
	//if logged in
	if (props.icon) {
		return (
			<nav className="bg-darkMain h-16 relative flex items-center">
				{/* logo */}
				<a href="/" className="absolute left-20">
					<Image
						src="/bosyuu.svg"
						alt="bosyuu logo"
						width={140}
						height={140}
					/>
				</a>

				<div className="w-32 flex justify-around absolute right-[4.4rem]">
					<button
						onClick={() =>
							signOut({
								callbackUrl: 'https://bosyuu.vercel.app/board', //
							})
						}
						className={`text-red-500 rokkitt ${rokkitt.className}`}
					>
						Logout
					</button>
					<a
						className="rounded-full hover:cursor-pointer"
						href="/profile"
					>
						<Image
							src={props.icon}
							alt="icon"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</a>
				</div>
			</nav>
		);
	}

	//if not logged in
	return (
		<nav className="bg-darkMain h-16 relative flex items-center">
			{/* logo */}
			<a href="/" className="absolute left-20">
				<Image
					src="/bosyuu.svg"
					alt="bosyuu logo"
					width={140}
					height={140}
				/>
			</a>

			<div className="w-32 flex justify-around absolute right-[5.4rem]">
				<button
					onClick={() =>
						signIn('discord', {
							callbackUrl: 'https://bosyuu.vercel.app/profile',
						})
					}
					className={`text-white ${rokkitt.className}`}
				>
					Login with Discord
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
