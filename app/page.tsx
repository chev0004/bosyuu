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

        //sort victims by most recent timestamp
        const sorted = victims.sort(
            (a: { timestamp: number }, b: { timestamp: number }) =>
                b.timestamp - a.timestamp
        );

        return <p>a</p>;

        // return (
        //     //display victim data
        //     <div className='gap-4 grid grid-cols-4'>
        //         {sorted.map((victim: victim) => (
        //             <div
        //                 key={victim.userid}
        //                 className='bg-slate-400 border-red-500 border-2 p-4'
        //             >
        //                 <Image
        //                     src={victim.icon}
        //                     alt='icon'
        //                     width={64}
        //                     height={64}
        //                 />
        //                 <p>userid: {victim.userid}</p>
        //                 <p>displayname: {victim.displayname}</p>
        //                 <p>username: {victim.username}</p>
        //                 <p>discrim: {victim.discrim}</p>
        //                 <p>tags: {victim.tags}</p>
        //                 <p>description: {victim.description}</p>
        //                 <p>valid: {victim.valid ? 'true' : 'false'}</p>
        //                 <p>timestamp: {formatTimestamp(victim.timestamp)}</p>
        //             </div>
        //         ))}
        //     </div>
        // );
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
        case secondsAgo < 31536000: //about 365 days
            const daysAgo = Math.floor(secondsAgo / 86400);
            return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
        default:
            const yearsAgo = Math.floor(secondsAgo / 31536000); //about 365 days per year
            return yearsAgo === 1
                ? `${yearsAgo} year ago`
                : `${yearsAgo} years ago`;
    }
};

export default Home;
