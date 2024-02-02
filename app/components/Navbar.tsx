import Link from 'next/link';

import React from 'react';

const Navbar = () => {
    return (
        <nav className='bg-main'>
            <Link href='/'>Home</Link>
            <Link href='/friends'>friends</Link>
        </nav>
    );
};

export default Navbar;
