import React from 'react';

const Updated = () => {
    return (
        <>
            <div className='w-screen h-screen bg-black opacity-70 absolute top-0 z-40'></div>
            <div className='w-screen h-screen absolute top-0 items-center justify-center flex z-50'>
                <div className='text-center  bg-back p-4 w-[500px] h-[160px] rounded-md overflow-hidden relative flex items-center justify-center'>
                    <div className='bg-darkMain absolute top-0 right-0 left-0 h-6 flex items-center justify-end p-1'>
                        <button className='group w-5 h-5 flex items-center justify-center hover:bg-[rgba(255,255,255,0.44)] rounded-full'>
                            <div className='bg-white h-[1px] w-[10px]  rounded-full absolute group-hover:bg-darkMain'></div>
                            {/* <div className='bg-white h-[1px] w-[12px]  rounded-full -rotate-45 absolute'></div> */}
                        </button>
                    </div>
                    <p className='text-white'>Profile updated</p>
                </div>
            </div>
        </>
    );
};

export default Updated;
