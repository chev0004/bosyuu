import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { formatTimestamp } from '../page';
import Search from '../../components/Search';
import PopularTags from '@/app/components/PopularTags';
import VictimGrid from '@/app/components/VictimGrid';

const BoardSearch = async () => {
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

export default BoardSearch;
