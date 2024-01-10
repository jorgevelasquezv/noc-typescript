import mongoose from 'mongoose';
import { envs } from '../../../src/config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from '../../../src/data/mongo';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log-entity';
import { MongoLogDatasource } from './../../../src/infrastructure/datasources/mongo-log.datasource.impl';
describe('mongo-log.datasource.impl.ts MongoLogDatasource', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });
    
    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const mongoLogDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'send-email-logs.ts',
    });

    const spy = jest.spyOn(console, 'log');

    test('Should create a new log', async () => {
        await mongoLogDatasource.saveLogs(log);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Mongo Log Created', expect.any(String));
    });

    test('Should get logs', async () => {
        await mongoLogDatasource.saveLogs(log);
        await mongoLogDatasource.saveLogs(log);
        const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(2);
        expect(logs[0]).toEqual(log);
        expect(logs[1]).toEqual(log);
    });
});