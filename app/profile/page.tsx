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

    const updateProfile = async (formData: FormData) => {
        'use server';

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

    const bumpProfile = async () => {
        'use server';
        await connect();
        await Victim.findByIdAndUpdate(victimData._id, {
            timestamp: Date.now(),
            cooldown: Date.now(),
        });
    };

    return (
        <div>
            <Profile
                victim={victimData}
                updateProfile={updateProfile}
                bumpProfile={bumpProfile}
            />
        </div>
    );
};

export default profile;
