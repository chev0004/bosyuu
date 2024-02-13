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
        </div>
    );
};

export default profile;
