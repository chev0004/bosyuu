'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const PageControls = (props: { totalPages: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams?.get('page') ?? '1';
    const lastPage = Boolean(parseInt(page) === props.totalPages);
    const firstPage = Boolean(parseInt(page) === 1);

    const handleNext = () => {
        const nextPage = parseInt(page) + 1;
        router.push(`?page=${nextPage}`, { scroll: false });
    };

    const handlePrev = () => {
        const previousPage = parseInt(page) - 1;
        router.push(`?page=${previousPage}`, { scroll: false });
    };

    return (
        <div className='flex justify-center text-white space-x-4'>
            <button
                onClick={handlePrev}
                disabled={firstPage}
                className={`hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 ${
                    firstPage && 'cursor-not-allowed'
                }`}
            >
                <IoIosArrowBack
                    className={`transition-opacity duration-300 ${
                        firstPage ? 'opacity-40' : 'opacity-100'
                    }`}
                />
            </button>
            <button
                onClick={handleNext}
                disabled={lastPage}
                className={`hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 ${
                    lastPage && 'cursor-not-allowed'
                }`}
            >
                <IoIosArrowForward
                    className={`transition-opacity duration-300 ${
                        lastPage ? 'opacity-40' : 'opacity-100'
                    }`}
                />
            </button>
        </div>
    );
};

export default PageControls;
