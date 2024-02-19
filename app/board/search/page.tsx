import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { redirect } from 'next/navigation';
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
    const query = searchParams['q'];
    try {
        const victims = await Victim.find();
        let displayVictims;

        query
            ? (displayVictims = await Victim.find({
                  $or: [
                      { displayname: { $regex: query, $options: 'i' } },
                      { username: { $regex: query, $options: 'i' } },
                      { tags: { $regex: query, $options: 'i' } },
                      { description: { $regex: query, $options: 'i' } },
                  ],
              }))
            : (displayVictims = victims);

        const getQuery = async (formData: FormData) => {
            'use server';
            if (!formData.get('query')) return;
            const query = formData.get('query');

            redirect(`/board/search?q=${query}`);
        };

        return (
            <>
                {/* search box */}
                <Search getQuery={getQuery} />

                {/* popular tags */}
                <PopularTags victims={victims} />

                {/* jail cells */}
                <VictimGrid victims={displayVictims} />
            </>
        );
    } catch (error) {
        console.error('something went wrong:', error);
    }
};

export default BoardSearch;
