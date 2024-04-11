'use client'

const VictimProfile = () => {
    return (
        <div className='opacity-0 hover:opacity-100 absolute transition-opacity duration-100 flex items-center justify-center hover:cursor-pointer'>
            <p className='text-white absolute text-[11px] text-center z-20 font-semibold'>
                VIEW PROFILE
            </p>
            <div className='opacity-40 bg-black w-[64px] h-[64px] rounded-full'></div>
        </div>
    )
}

export default VictimProfile