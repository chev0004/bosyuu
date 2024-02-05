import Link from 'next/link';

import React from 'react';

const Navbar = () => {
    return (
        <nav className='bg-main text-center flex justify-around '>
            <Link href='/' className='m-4'>
                Home
            </Link>
        </nav>
    );
};

export default Navbar;
