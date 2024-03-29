import Image from 'next/image';
import { formatTimestamp } from '@/libs/format';
import PageControls from '../components/PageControls';
import { fetchVictimData, victim } from '../board/page';

const VictimGrid = async (props: any) => {
    //information about user (I really need to change my naming style (this is for highlighted page colour))
    const victimData = await fetchVictimData();

    //offset because array index starts at 0
    const page = props.page - 1;
    const max = 24; //max amount of victims per page
    const start = Number(page) * max; //start index
    const end = start + max; //end index

    //sort victims by most recent timestamp
    let sortedVictims = props.victims.sort(
        (a: { timestamp: number }, b: { timestamp: number }) =>
            b.timestamp - a.timestamp
    );

    //calculate max amount of pages
    const totalPages = Math.ceil(sortedVictims.length / max);

    //slice victims (display limited but still sorted data)
    sortedVictims = sortedVictims.slice(start, end);
    return (
        <div className='flex justify-center py-24 relative'>
            {/* victim grid */}
            <div className='gap-8 grid grid-cols-1 w-11/12 lg:grid-cols-3 md:grid-cols-2 relative'>
                {sortedVictims.map((victim: victim) => (
                    <div
                        key={victim.userid}
                        className='bg-darkMain rounded-md text-white overflow-hidden relative'
                    >
                        {/* gender banner */}
                        <div
                            className={`h-16 ${
                                victim.gender == '1'
                                    ? 'bg-main'
                                    : victim.gender === '2'
                                    ? 'bg-pink-300'
                                    : 'bg-lightMain'
                            }`}
                        ></div>

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
                                                            <a
                                                                key={index}
                                                                className='text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center'
                                                                href={`/board?tag=${tag}`}
                                                            >
                                                                {/* dot thing */}
                                                                <div className='w-1 h-1 rounded-full bg-white'></div>
                                                                {tag}
                                                            </a>
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
                                                                <span key={j}>
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
            {/* page controls */}
            {totalPages && (
                <div className=' bottom-9 absolute'>
                    <PageControls
                        totalPages={totalPages}
                        victimData={victimData}
                    />
                </div>
            )}
        </div>
    );
};

export default VictimGrid;
