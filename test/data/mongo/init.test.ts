import 'dotenv/config';
import { MongoDatabase } from '../../../src/data/mongo/init';
import mongoose from 'mongoose';

describe('init MongoDB', () => {

    afterAll(() => { 
        mongoose.connection.close();
    });

    test('Should connect to MongoDB', async () => {
        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        });
        expect(connected).toBeTruthy();
    });

    test('Should connect to MongoDB', async () => {
        try {
            const connected = await MongoDatabase.connect({
                mongoUrl: 'mongodb://localhost:2701745',
                dbName: process.env.MONGO_DB_NAME!,
            });
            expect(connected).toBeFalsy();
        } catch (error) {}
    });
});
