'use client';

import { authOptions } from '../api/auth/[...nextauth]/route';
import { signOut, signIn, useSession } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
import React from 'react';

const Navbar = () => {
    const { data: session, status } = useSession();
    // const session = await getServerSession(authOptions);
    // session ? console.log(session) : console.log('no session');

    if (status == 'authenticated') {
        console.log(session, 'amongus');
        return (
            <nav className='bg-main text-center flex justify-around '>
                <button onClick={() => signOut()}>Sign out</button>
            </nav>
        );
    }

    return (
        <nav className='bg-main text-center flex justify-around '>
            <button onClick={() => signIn('discord')}>Sign in </button>
        </nav>
    );
};

export default Navbar;
