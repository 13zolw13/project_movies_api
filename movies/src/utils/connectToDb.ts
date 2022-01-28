import mongoose from 'mongoose';

async function connectDb() {
    const dbUri = <string>process.env.DB_URI

    try {
        await mongoose.connect(dbUri);
        console.log('Connected to db');
    }
    catch (e) {
        console.error(e);
        process.exit(1)
    }
}


export default connectDb;

