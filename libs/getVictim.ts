import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';

import Victim from '@/schemas/victims';

export const fetchVictimData = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const victim = await Victim.findOne({ userid: session?.user?.profile?.id });

    //convert object
    return JSON.parse(JSON.stringify(victim));
};