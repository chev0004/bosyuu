import dotenv from 'dotenv';
import amongus from 'mongoose';

dotenv.config();

const connect = async () => {
    try {
        if (amongus.connection.readyState === 0) {
            await amongus.connect(process.env.mongoLogin as string);
            console.log('mongo connected');
        }
    } catch (error) {
        console.log(error);
    }
};
connect();

export default connect;
