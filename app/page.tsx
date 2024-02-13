import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Image from 'next/image';
import React from 'react';

type victim = {
    userid: string;
    displayname: string;
    username: string;
    discrim: string;
    tags: string[];
    description: string;
    icon: string;
    valid: boolean;
    timestamp: number;
};

const Home = async () => {
    try {
        await connect();
        const victims = await Victim.find();

        //empty array
        let popularTags: { tag: string; count: number }[] = [];

        const getTagCounts = async () => {
            try {
                //object to store tag counts
                const tagCounts: { [key: string]: number } = {};

                //loop through each victim and their tags
                victims.forEach((victim) => {
                    victim.tags.forEach((tag: string) => {
                        //increment the count for this tag
                        if (tagCounts[tag]) {
                            tagCounts[tag]++;
                        } else {
                            tagCounts[tag] = 1;
                        }
                    });
                });

                //convert it into an array of objects with tag and count properties (thanks chatgpt)
                const tagCountArray = Object.keys(tagCounts).map((tag) => ({
                    tag,
                    count: tagCounts[tag],
                }));

                //final product (object with properties tag and count)
                popularTags = tagCountArray.sort(
                    (a: { count: number }, b: { count: number }) =>
                        b.count - a.count
                );
            } catch (error) {
                console.error("something's gone wrong again:", error);
                throw error;
            }
        };

        getTagCounts();

        //sort victims by most recent timestamp
        const sortedVictims = victims.sort(
            (a: { timestamp: number }, b: { timestamp: number }) =>
                b.timestamp - a.timestamp
        );

        const sex = async (formData: FormData) => {
            'use server';
            console.log(formData.get('query'));
        };

        return (
            <>
                {/* search box */}
                <form
                    action={sex}
                    className='h-24 flex items-center justify-center'
                >
                    <input
                        name='query'
                        placeholder='Search (username, description, or a tag)'
                        autoComplete='off'
                        className='bg-darkMain rounded-md focus:ring-0 focus:outline-none h-10 w-8/12 p-4 text-white'
                    />
                </form>

                {/* popular tags */}
                <div className='flex justify-center'>
                    <div className='h-48 bg-darkMain rounded-md w-11/12 px-2'>
                        <div className='flex justify-center mt-1'>
                            <p className='text-gray-400 text-sm'>
                                Popular tags
                            </p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='mb-2 bg-back w-11/12 h-[2px]'></div>
                        </div>
                        <div className='overflow-scroll h-[150px]'>
                            <div className='flex justify-start items-center flex-row flex-wrap gap-1'>
                                {popularTags.map(
                                    (
                                        tag: { tag: string; count: number },
                                        i: number
                                    ) => (
                                        <div
                                            key={i}
                                            className='text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center'
                                        >
                                            {`${tag.tag} (${tag.count})`}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* jail cells */}
                <div className='flex justify-center py-24'>
                    {/* victim grid */}
                    <div className='gap-8 grid grid-cols-1 w-11/12 lg:grid-cols-3 md:grid-cols-2'>
                        {sortedVictims.map((victim: victim) => (
                            <div
                                key={victim.userid}
                                className='bg-darkMain rounded-md text-white overflow-hidden relative'
                            >
                                {/* gender banner */}
                                <div className='h-16 bg-main'></div>

                                {/* icon */}
                                <div className='bg-darkMain w-[74px] h-[74px] flex items-center justify-center rounded-full top-6 left-2 absolute'>
                                    <Image
                                        src={victim.icon}
                                        alt='icon'
                                        width={64}
                                        height={64}
                                        className='rounded-full'
                                    />
                                </div>

                                {/* tags and description */}
                                <div className='h-fit bg-darkMain px-4 pb-4'>
                                    {/* gap (was thinking of adding nitro badge here) */}
                                    <div className='h-10 my-2 flex items-center justify-end'>
                                        {/* timestamp */}
                                        <p className='bg-darkerMain rounded-lg p-1 font-sans text-[0.8rem] font-light'>
                                            {formatTimestamp(victim.timestamp)}
                                        </p>
                                    </div>
                                    <div className='h-80 bg-darkerMain rounded-md p-3'>
                                        {/* global name */}
                                        <p className='text-white font-semibold font-sans text-lg'>
                                            {victim.displayname}
                                        </p>
                                        {/* username */}
                                        <p className='text-white font-sans font-medium text-[0.7rem] rounded-full'>
                                            {victim.username}
                                        </p>
                                        {/* divider line */}
                                        <div className='mt-2 mb-2 bg-darkMain w-12/12 h-[2px]'></div>
                                        {/* scrollable container for tags and description */}
                                        <div className='h-56 overflow-scroll'>
                                            {/* shrunken div for scroll space */}
                                            <div className='w-[94%]'>
                                                {victim.tags.length !== 0 && (
                                                    <div>
                                                        {/* tags (as if I can't tell) */}
                                                        <p className='text-white font-sans font-semibold text-[0.8rem]'>
                                                            Tags
                                                        </p>
                                                        <div className='flex flex-row gap-1 flex-wrap'>
                                                            {victim.tags.map(
                                                                (
                                                                    tag: string,
                                                                    index: React.Key
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className='text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center'
                                                                    >
                                                                        {/* dot thing */}
                                                                        <div className='w-1 h-1 rounded-full bg-white'></div>
                                                                        {tag}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <p className='text-white font-sans font-semibold text-[0.8rem]'>
                                                    Description
                                                </p>
                                                <p className='text-white font-sans text font-light text-[0.86rem]'>
                                                    {
                                                        //damn wtf I can't display \n's
                                                        victim.description
                                                            .split('\n')
                                                            .map(
                                                                (
                                                                    i: string,
                                                                    j: React.Key
                                                                ) => {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                j
                                                                            }
                                                                        >
                                                                            {i}
                                                                            <br />
                                                                        </span>
                                                                    );
                                                                }
                                                            )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error('something went wrong:', error);
    }
};

//translate miliseconds so you humans can read it
const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    switch (true) {
        case secondsAgo < 60:
            return secondsAgo === 1
                ? `${secondsAgo} second ago`
                : `${secondsAgo} seconds ago`;
        case secondsAgo < 3600:
            const minutesAgo = Math.floor(secondsAgo / 60);
            return minutesAgo === 1
                ? `${minutesAgo} minute ago`
                : `${minutesAgo} minutes ago`;
        case secondsAgo < 86400:
            const hoursAgo = Math.floor(secondsAgo / 3600);
            return hoursAgo === 1
                ? `${hoursAgo} hour ago`
                : `${hoursAgo} hours ago`;
        case secondsAgo < 2592000: //about 30 days
            const daysAgo = Math.floor(secondsAgo / 86400);
            return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
        case secondsAgo < 31536000: //about 365 days
            const monthsAgo = Math.floor(secondsAgo / 2592000); //about 30 days per month
            return monthsAgo === 1
                ? `${monthsAgo} month ago`
                : `${monthsAgo} months ago`;
        default:
            const yearsAgo = Math.floor(secondsAgo / 31536000); //about 365 days per year
            return yearsAgo === 1
                ? `${yearsAgo} year ago`
                : `${yearsAgo} years ago`;
    }
};

export default Home;
