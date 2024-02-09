import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';
import Profile from '../components/Profile';

const profile = async () => {
    const session = await getServerSession(authOptions);

    const res = await fetch(
        `http://localhost:3000/api/victims/${session.user.profile.id}`
    );
    const victimData = (await res.json()).victim;

    const sex = async (formData: string) => {
        'use server';
        console.log(formData);
    };

    return (
        <div>
            <Profile victim={victimData} sex={sex} />
            {/* <form action={sex}>
                <input
                    name='description'
                    placeholder={victimData.description}
                    autoComplete='off'
                    className=' bg-blue-300 opacity-40 rounded-md focus:ring-0 focus:outline-none focus:opacity-100 focus'
                />
                <button type='submit' className='btn btn-primary btn-sm ml-2 '>
                    set description
                </button>
            </form> */}
        </div>
    );
};

export default profile;
