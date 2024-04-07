import { Metadata } from 'next';
import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import Profile from '../components/Profile';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';

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
    const victimData = session?.user?.profile;
    console.log(session, 4);

    const updateProfile = async (formData: FormData) => {
        'use server';

        const {
            description: description,
            tags: tags,
            gender: gender,
        } = formData;

        await connect();
        await Victim.findByIdAndUpdate(victimData?._id, {
            description,
            tags,
            gender,
        });
    };

    const bumpProfile = async () => {
        'use server';
        await connect();

        if (Date.now() - victimData?.cooldown < 43200000) return;

        await Victim.findByIdAndUpdate(victimData?._id, {
            valid: true,
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
