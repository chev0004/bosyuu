import { victim } from '@/app/board/page';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';

let victimData: victim;

const getVictim = async () => {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        `https://bosyuu.netlify.app/api/victims/${session?.user?.profile.id}`
    );
    victimData = (await res?.json()).victim;
};

export const fetchVictimData = async () => {
    if (!victimData) {
        await getVictim();
    }
    return victimData;
};
