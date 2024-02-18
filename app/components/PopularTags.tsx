import { victim } from '../board/page';

const PopularTags = (props: any) => {
    //empty array
    let popularTags: { tag: string; count: number }[] = [];

    const getTagCounts = async () => {
        try {
            //object to store tag counts
            const tagCounts: { [key: string]: number } = {};

            //loop through each victim and their tags
            props.victims.forEach((victim: victim) => {
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
    return (
        <div className='flex justify-center'>
            <div className='h-48 bg-darkMain rounded-md w-11/12 px-2'>
                <div className='flex justify-center mt-1'>
                    <p className='text-gray-400 text-sm'>Popular tags</p>
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
    );
};

export default PopularTags;
