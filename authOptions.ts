import jwt from 'jsonwebtoken';

import DiscordProvider from 'next-auth/providers/discord';

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
                    locale: profile.locale,
                    gender: '3',
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
            session.user.profile = token.profile;
            return session;
        },
    },
};
