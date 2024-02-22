'use client';

import { victim } from '../board/page';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const PageControls = (props: { totalPages: number; victimData: victim }) => {
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

    let colour: string = 'bg-[#707070]';
    props.victimData?.gender == '1'
        ? (colour = 'bg-[#c1d5e9]')
        : props.victimData?.gender === '2'
        ? (colour = 'bg-[#f9a8d5]')
        : (colour = 'bg-[#707070]');

    return (
        <div className='flex justify-center text-white space-x-2 w-fit'>
            <button
                onClick={handlePrev}
                disabled={firstPage}
                className={`hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 px-3 ${
                    firstPage && 'cursor-not-allowed'
                }`}
            >
                <IoIosArrowBack
                    className={`transition-opacity duration-300 ${
                        firstPage ? 'opacity-40' : 'opacity-100'
                    }`}
                />
            </button>

            {/* make for loop to display pages */}
            <div className='flex space-x-2'>
                {(() => {
                    const buttons = [];
                    for (let p = 1; p <= props.totalPages; p++) {
                        buttons.push(
                            <div className='relative' key={p}>
                                <button
                                    onClick={() =>
                                        router.push(`?page=${p}`, {
                                            scroll: false,
                                        })
                                    }
                                    className='hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 size-10'
                                >
                                    {p}
                                </button>
                                {parseInt(page) == p && (
                                    <div
                                        className={`w-full ${colour} h-[2px] absolute bottom-0`}
                                    ></div>
                                )}
                            </div>
                        );
                    }
                    return buttons;
                })()}
            </div>

            <button
                onClick={handleNext}
                disabled={lastPage}
                className={`hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 px-3 ${
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
