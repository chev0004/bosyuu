import jwt from 'jsonwebtoken';
import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        //collect tax, I mean the victim's information from the request
        const victimData = await req.json();

        //decode the token and pass it as userid (god damn typescript)
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        const decodedToken = jwt.verify(
            token as any,
            process.env.NEXTAUTH_SECRET as string
        );
        victimData.userid = (decodedToken as { userid: string }).userid;

        //connect to db
        await connect();

        //check if victim already exists
        const victim = await Victim.findOne({ userid: victimData.userid });

        //just let them in if the victim profile already exists, if not, make one
        if (victim) {
            return NextResponse.json(
                { message: 'victim already exists' },
                { status: 200 }
            );
        } else {
            await Victim.create(victimData);
            return NextResponse.json(
                { message: 'victim secured' },
                { status: 200 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: 'loud incorrect buzzer' },
            { status: 422 }
        );
    }
};

export const GET = async () => {
    try {
        await connect();
        const victims = await Victim.find();
        return NextResponse.json({ victims }, { status: 200 });
    } catch (error) {
        console.log('something went wrong (idk what it is) ', error);
    }
};
