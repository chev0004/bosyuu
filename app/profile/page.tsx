import React from 'react';
import { Metadata } from 'next';
import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Profile from '../components/Profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

export const metadata: Metadata = {
    title: 'Bosyuu - Profile',
    description: 'Profile editor',
};

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

        if (Date.now() - victimData.cooldown < 43200000) return;

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
