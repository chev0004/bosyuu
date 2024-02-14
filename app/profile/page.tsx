import React from 'react';
import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Profile from '../components/Profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

interface FormData {
    description: string;
    tags: string[];
    gender: string;
}

const profile = async () => {
    const session = await getServerSession(authOptions);

    const res = await fetch(
        `http://localhost:3000/api/victims/${session.user.profile.id}`
    );
    const victimData = (await res.json()).victim;

    const sex = async (formData: FormData) => {
        'use server';
        console.log(formData);

        const {
            description: description,
            tags: tags,
            gender: gender,
        } = formData;

        await connect();
        await Victim.findByIdAndUpdate(victimData._id, {
            description,
            tags,
            gender,
        });
    };

    return (
        <div>
            <Profile victim={victimData} sex={sex} />
        </div>
    );
};

export default profile;
