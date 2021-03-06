import mongoose from 'mongoose';
import log from './logger';

function connectDb(dbUri: string) {


    try {
        log.info("Connecting to db");
        return mongoose.connect(dbUri);

    }
    catch (e: any) {
        log.error(e);
        process.exit(1)
    }
}


export default connectDb;

