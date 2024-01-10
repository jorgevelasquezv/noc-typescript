import 'dotenv/config';
import { MongoDatabase } from '../../../../src/data/mongo/init';
import { LogModel } from './../../../../src/data/mongo/models/log.model';
import mongoose from 'mongoose';

describe('log.model.ts', () => {
    afterAll(() => {
        mongoose.connection.close();
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        });
    });

    test('Should return LogModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low',
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual(
            expect.objectContaining({
                ...logData,
                createAt: expect.any(Date),
                id: expect.any(String),
            })
        );

        await LogModel.deleteOne({ _id: log.id });
    });

    test('Should return the schema object', () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(
            expect.objectContaining({
                level: {
                    type: expect.any(Function),
                    enum: ['low', 'medium', 'high'],
                    default: 'low',
                    required: true,
                },
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function), required: false },
                createAt: expect.any(Object),
            })
        );
    });
});
