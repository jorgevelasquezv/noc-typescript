import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(option: ConnectionOptions) {
        const { mongoUrl, dbName } = option;

        try {
            await mongoose.connect(mongoUrl, {
                dbName,
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
