'use client';

import { victim } from '../board/page';
import { useRouter, useSearchParams, notFound } from 'next/navigation';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const PageControls = (props: {
    totalPages: number;
    victimData: victim | null;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams?.get('page') ?? '1';
    const lastPage = Boolean(parseInt(page) === props.totalPages);
    const firstPage = Boolean(parseInt(page) === 1);
    const hasParams = Boolean(searchParams?.toString());

    const handleParams = (p: number) => {
        if (!hasParams) {
            router.push(`/board?page=${p}`, {
                scroll: false,
            });
        } else {
            if (searchParams?.has('page')) {
                router.push(
                    `/board?${searchParams?.toString().slice(0, -1)}${p}`,
                    {
                        scroll: false,
                    }
                );
            } else {
                router.push(`/board?${searchParams?.toString()}&page=${p}`, {
                    scroll: false,
                });
            }
        }
    };

    if (parseInt(page) > props.totalPages) return notFound();

    const handleNext = () => {
        const nextPage = parseInt(page) + 1;
        handleParams(nextPage);
    };

    const handlePrev = () => {
        const previousPage = parseInt(page) - 1;
        handleParams(previousPage);
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
                    if (parseInt(page) <= 4) {
                        let limit: number;
                        props.totalPages > 4
                            ? (limit = 4)
                            : (limit = props.totalPages);
                        for (let p = 1; p <= limit; p++) {
                            buttons.push(
                                <div className='relative' key={p}>
                                    <button
                                        onClick={() => {
                                            handleParams(p);
                                        }}
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
                        props.totalPages > 4 &&
                            buttons.push(
                                <div
                                    className='relative space-x-2'
                                    key={props.totalPages}
                                >
                                    <span>....</span>
                                    <button
                                        onClick={() => {
                                            handleParams(props.totalPages);
                                        }}
                                        className='hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 size-10'
                                    >
                                        {props.totalPages}
                                    </button>
                                    {parseInt(page) == props.totalPages && (
                                        <div
                                            className={`w-full ${colour} h-[2px] absolute bottom-0`}
                                        ></div>
                                    )}
                                </div>
                            );
                    } else {
                        buttons.push(
                            <div className='relative space-x-2' key={1}>
                                <button
                                    onClick={() => {
                                        handleParams(1);
                                    }}
                                    className='hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 size-10'
                                >
                                    {1}
                                </button>
                                {parseInt(page) == 1 && (
                                    <div
                                        className={`w-full ${colour} h-[2px] absolute bottom-0`}
                                    ></div>
                                )}
                                <span>....</span>
                            </div>
                        );
                        let start: number;
                        let end: number;

                        props.totalPages - 3 > parseInt(page)
                            ? (start = parseInt(page))
                            : (start = props.totalPages - 3);

                        props.totalPages - 3 > parseInt(page)
                            ? (end = parseInt(page) + 3)
                            : (end = props.totalPages);

                        for (let p = start; p <= end; p++) {
                            buttons.push(
                                <div className='relative' key={p}>
                                    <button
                                        onClick={() => {
                                            handleParams(p);
                                        }}
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
                        props.totalPages > parseInt(page) + 3 &&
                            buttons.push(
                                <div
                                    className='relative space-x-2'
                                    key={props.totalPages}
                                >
                                    <span>....</span>
                                    <button
                                        onClick={() => {
                                            handleParams(props.totalPages);
                                        }}
                                        className='hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2 size-10'
                                    >
                                        {props.totalPages}
                                    </button>
                                    {parseInt(page) == props.totalPages && (
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
