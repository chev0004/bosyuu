import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { formatTimestamp } from '../page';
import Search from '../../components/Search';
import VictimGrid from '@/app/components/VictimGrid';
import PopularTags from '@/app/components/PopularTags';

const BoardSearch = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    console.log(searchParams);
    try {
        await connect();
        const victims = await Victim.find();

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
                <PopularTags victims={victims} />

                {/* jail cells */}
                <VictimGrid victims={victims} />
            </>
        );
    } catch (error) {
        console.error('something went wrong:', error);
    }
};

export default BoardSearch;
