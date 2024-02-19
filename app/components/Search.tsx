'use client';

import { useRouter } from 'next/navigation';

const Search = () => {
    const router = useRouter();

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            //if enter key is pressed
            event.preventDefault();
            const inputValue = event.target.value;
            router.push(`/board?search=${inputValue}`);
        }
    };
    return (
        <form
            onKeyDown={handleKeyDown}
            className='h-24 flex items-center justify-center'
        >
            <input
                name='query'
                placeholder='Search (username, description, or a tag)'
                autoComplete='off'
                className='bg-darkMain rounded-md focus:ring-0 focus:outline-none h-10 w-8/12 p-4 text-white'
            />
        </form>
    );
};

export default Search;
