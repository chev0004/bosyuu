import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Search from '../components/Search';
import VictimGrid from '../components/VictimGrid';
import PopularTags from '../components/PopularTags';

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

const Board = async ({
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const query = searchParams['search'];
    try {
        await connect();

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

        return (
            <>
                {/* search box */}
                <Search />

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

export default Board;
