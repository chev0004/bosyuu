'use client';

import { signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    const { data: session, status } = useSession();

    if (status == 'loading') {
        return (
            <nav className='bg-darkMain h-16 relative flex items-center'></nav>
        );
    }

    if (status == 'authenticated') {
        return (
            <nav className='bg-darkMain h-16 relative flex items-center'>
                <div className='w-32 flex justify-around absolute right-4'>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className='text-red-500'
                    >
                        Logout
                    </button>
                    <Image
                        src={session.user?.image as string}
                        alt='icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                </div>
            </nav>
        );
    }

    return (
        <nav className='bg-darkMain h-16 relative flex items-center'>
            {/* <button onClick={() => signIn('discord', { callbackUrl: '/' })}>
                Sign in{' '}
            </button> */}

            <div className='w-32 flex justify-around absolute right-4'>
                <button
                    onClick={() => signIn('discord', { callbackUrl: '/' })}
                    className='text-white'
                >
                    Login with Discord
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
