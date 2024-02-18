import connect from '@/libs/mongo';
import Victim from '@/schemas/victims';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const query = req.nextUrl.searchParams.get('q');

        if (!query) {
            return NextResponse.json(
                { error: 'No search query provided' },
                { status: 400 }
            );
        }

        await connect();
        // const victims = await Victim.find({ tags: { $in: [query] } });

        const victims = await Victim.find({
            $or: [
                { userid: { $regex: query, $options: 'i' } },
                { displayname: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
                { discrim: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { icon: { $regex: query, $options: 'i' } },
                { gender: { $regex: query, $options: 'i' } },
            ],
        });

        return NextResponse.json({ victims }, { status: 200 });
    } catch (error) {
        console.log('something went wrong (idk what it is) ', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
};
