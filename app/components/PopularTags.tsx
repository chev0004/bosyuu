const PopularTags = (props: any) => {
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
                        {props.popularTags.map(
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
