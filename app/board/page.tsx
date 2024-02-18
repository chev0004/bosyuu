import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Search from '../components/Search';
import PopularTags from '../components/PopularTags';
import VictimGrid from '../components/VictimGrid';

export interface victim {
    userid: string;
    displayname: string;
    username: string;
    discrim: string;
    tags: string[];
    description: string;
    icon: string;
    valid: boolean;
    timestamp: number;
    gender: string;
}

const Board = async () => {
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

        const getQuery = async (formData: FormData) => {
            'use server';
            if (!formData.get('query')) return;
            console.log(formData.get('query'));
            const query = formData.get('query');

            try {
                const res = await fetch(
                    `http:localhost:3000/api/search?q=${query}`
                );
                if (!res.ok) {
                    throw new Error('failed to fetch data');
                }
                const data = await res.json();
                console.log(data);
            } catch (error) {
                console.error('something went wrong:', error);
                return { error: 'an error occurred while fetching data' };
            }
        };

        return (
            <>
                {/* search box */}
                <Search getQuery={getQuery} />

                {/* popular tags */}
                <PopularTags popularTags={popularTags} />

                {/* jail cells */}
                <VictimGrid
                    sortedVictims={sortedVictims}
                    formatTimestamp={formatTimestamp}
                />
            </>
        );
    } catch (error) {
        console.error('something went wrong:', error);
    }
};

//translate miliseconds so you humans can read it
export const formatTimestamp = (timestamp: number) => {
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

export default Board;
