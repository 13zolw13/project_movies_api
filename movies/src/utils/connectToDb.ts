import mongoose from 'mongoose';
import log from './logger';

async function connectDb(dbUri: string) {


    try {
        await mongoose.connect(dbUri);
        log.info('Connected to db');
    }
    catch (e: any) {
        log.error(e);
        process.exit(1)
    }
}


export default connectDb;

