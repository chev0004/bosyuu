'use client';

import { useRouter } from 'next/navigation';
import { IoSearchSharp } from 'react-icons/io5';

const Search = () => {
    const router = useRouter();

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            //if enter key is pressed
            event.preventDefault();
            const query = event.target.value;

            !query
                ? router.push('/board')
                : router.push(`/board?search=${query}`);
        }
    };
    return (
        <form
            onKeyDown={handleKeyDown}
            className='h-24 flex items-center justify-center'
        >
            <div className='flex items-center justify-center w-8/12 relative'>
                <IoSearchSharp
                    color='white'
                    className='absolute right-4 h-5 w-5'
                />
                <input
                    name='query '
                    placeholder='Search (name, description, or a tag)'
                    autoComplete='off'
                    className='bg-darkMain rounded-md focus:ring-0 focus:outline-none h-10 w-full p-4 text-white'
                />
            </div>
        </form>
    );
};

export default Search;
