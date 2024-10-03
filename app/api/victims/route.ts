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
			//update victim's icon
			await Victim.findOneAndUpdate(
				{ userid: victimData.userid },
				{ $set: { icon: victimData.icon } }
			);
			return NextResponse.json(
				{ message: 'victim already exists' },
				{ status: 200 }
			);
		} else {
			await Victim.create(victimData);
			console.log('BALLS');
			return NextResponse.json(
				{ message: 'victim secured' },
				{ status: 200 }
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'loud incorrect buzzer' },
			{ status: 422 }
		);
	}
};
