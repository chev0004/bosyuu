const Search = (props: any) => {
    return (
        <form
            action={props.getQuery}
            className='h-24 flex items-center justify-center'
        >
            <input
                name='query'
                placeholder='Search (username, description, or a tag)'
                autoComplete='off'
                className='bg-darkMain rounded-md focus:ring-0 focus:outline-none h-10 w-8/12 p-4 text-white'
            />
        </form>
    );
};

export default Search;
