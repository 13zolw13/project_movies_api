import mongoose from 'mongoose';
import log from './logger';

function connectDb(dbUri: string) {


    try {
        console.log("connecting to db");
        return mongoose.connect(dbUri);

    }
    catch (e: any) {
        log.error(e);
        process.exit(1)
    }
}


export default connectDb;

