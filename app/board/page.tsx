import { Metadata } from 'next';
import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Search from '../components/Search';
import VictimGrid from '../components/VictimGrid';
import PopularTags from '../components/PopularTags';

export const metadata: Metadata = {
    title: 'Bosyuu - Board',
    description: 'Discord friend bulletin board',
    keywords: [
        'Discord',
        'Discord friends',
        'Discord bulletin board',
        'Discord friend board',
    ],
};

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

import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';

const Board = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const page = (searchParams['page'] as string) ?? '1';
    const query = searchParams['search'] as string;
    const tagQuery = searchParams['tag'] as string;

    await connect();

    const victims = await Victim.find();
    let displayVictims;
    let tagsMatches = 0;
    let nameMatches = 0;
    let descriptionMatches = 0;

    query
        ? (displayVictims = victims.filter((victim) => {
              const foundInDisplayName = victim.displayname
                  .toLowerCase()
                  .includes(query.toLowerCase());
              const foundInUsername = victim.username
                  .toLowerCase()
                  .includes(query.toLowerCase());
              const foundInTags = victim.tags.some(
                  (tag: string) => tag.toLowerCase() == query.toLowerCase()
              );
              const foundInDescription = victim.description
                  .toLowerCase()
                  .includes(query.toLowerCase());

              if (foundInDescription) {
                  descriptionMatches++;
              } else if (foundInTags) {
                  tagsMatches++;
              } else if (foundInUsername || foundInDisplayName) {
                  nameMatches++;
              }

              return (
                  foundInDisplayName ||
                  foundInUsername ||
                  foundInTags ||
                  foundInDescription
              );
          }))
        : tagQuery
        ? (displayVictims = victims.filter((victim) =>
              victim.tags.includes(tagQuery)
          ))
        : (displayVictims = victims);

    return (
        <>
            {/* search box */}
            <Search />

            {/* popular tags */}
            <PopularTags victims={victims} />

            {/* search results */}
            {query && (
                <div className='absolute inset-x-0 mx-auto mt-5'>
                    <p className='text-white text-center'>
                        Search results for &quot;{query}&quot;
                    </p>
                    <p className='text-white text-center'>
                        Total: {displayVictims.length}, Tags: {tagsMatches},
                        Users: {nameMatches}, Descriptions: {descriptionMatches}
                    </p>
                </div>
            )}

            {/* tag results */}
            {tagQuery && (
                <div className='absolute inset-x-0 mx-auto mt-8'>
                    <p className='text-white text-center'>
                        {displayVictims.length}
                        {displayVictims.length == 1 ? ' user' : ' users'} listed
                        with tag &quot;{tagQuery}&quot;
                    </p>
                </div>
            )}

            {/* jail cells */}
            <VictimGrid victims={displayVictims} page={page} />
        </>
    );
};

export default Board;
