import jwt from 'jsonwebtoken';

import DiscordProvider from 'next-auth/providers/discord';
import { victim } from './app/board/page';
import { getServerSession } from 'next-auth';

// const getVictim = async () => {
//     const session = await getServerSession(authOptions);
//     if (!session) return null;
//     const res = await fetch(
//         `https://bosyuu.netlify.app/api/victims/${session?.user?.profile?.id}`
//     );
//     victimData = (await res?.json()).victim;
// };

export const fetchVictimData = async () => {
    // if (!victimData) {
    //     await getVictim();
    // }

    let victimData: victim | null;

    const session = await getServerSession(authOptions);
    if (!session) return null;
    const res = await fetch(
        `https://bosyuu.netlify.app/api/victims/${session?.user?.profile?.id}`
    );
    victimData = (await res?.json()).victim;

    return victimData;
};

export const authOptions = {
    providers: [
        //env variables
        DiscordProvider({
            clientId: process.env.clientID as string,
            clientSecret: process.env.clientSecret as string,
            authorization: process.env.discoardOAuth as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }: any) {
            //create token for authentication
            const token = jwt.sign(
                { userid: profile.id },
                process.env.NEXTAUTH_SECRET as string,
                {
                    expiresIn: '1d',
                }
            );
            //create user through post request
            const res = await fetch('https://bosyuu.netlify.app/api/victims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userid: profile.id,
                    displayname: profile.global_name,
                    username: profile.username,
                    discrim: profile.discriminator,
                    tags: [],
                    description: '',
                    icon: profile.image_url,
                    valid: false,
                    // timestamp: 0,
                    locale: profile.locale,
                    gender: '3',
                    // cooldown: 0
                }),
            });

            if (!res.ok) {
                console.log('something went wrong (idk what it is)');
                return false;
            }

            return true;
        },
        async jwt({ token, user, account, profile }: any) {
            //pass profile object to token
            if (!token.profile) token.profile = profile;
            return Promise.resolve(token);
        },
        async session({ session, token, user }: any) {
            //take profile object from token
            session.user.profile = await fetchVictimData();
            console.log(session, 2);

            // console.log(victimData);

            return session;
        },
    },
};
