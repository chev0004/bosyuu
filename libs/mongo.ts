import dotenv from 'dotenv';
import amongus from 'mongoose';

dotenv.config();
let isConnected = false;

const connect = async () => {
	if (isConnected) return;

	try {
		if (amongus.connection.readyState === 0) {
			await amongus.connect(process.env.mongoLogin as string);

			isConnected = true;

			console.log('mongo connected');
		}
	} catch (error) {
		console.log(error);
	}
};
connect();

export default connect;
