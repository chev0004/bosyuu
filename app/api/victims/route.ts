import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { NextResponse } from 'next/server';

export type VictimRequestBody = {
    nextUrl: any;
    json: () => Promise<{
        userid: string;
        displayname: string;
        username: string;
        discrim: string;
        tags: string[];
        description: string;
        icon: string;
        valid: boolean;
        timestamp: number;
    }>;
};

export const POST = async (req: Request) => {
    try {
        const victimData = await req.json();
        await connect();
        await Victim.create(victimData);
        return NextResponse.json(
            { message: 'victim secured' },
            { status: 200 }
        );
    } catch (error) {
        console.log('something went wrong (idk what it is) ', error);
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
