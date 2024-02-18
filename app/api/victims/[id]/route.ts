import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
    try {
        const { id } = params;
        const victim = await Victim.findOne({ userid: id });
        await connect();
        return NextResponse.json({ victim }, { status: 200 });
    } catch (error) {
        console.log('something went wrong (idk what it is) ', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
