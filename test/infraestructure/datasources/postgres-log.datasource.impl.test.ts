import { PostgresLogDatasource } from './../../../src/infrastructure/datasources/postgres-log.datasource.impl';
import { PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log-entity";

describe('postgres-log.datasource.impl.ts PostgresLogDatasource', () => {

    const prisma = new PrismaClient();

    beforeEach(async () => {
        await prisma.logModel.deleteMany();
    });

    test('Should create a new log', async () => {
        const logDatasource = new PostgresLogDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'send-email-logs.ts',
        });
        await logDatasource.saveLogs(log);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(1);
        expect(logs[0]).toEqual(log);
    });

    test('Should get logs', async () => {
        const logDatasource = new PostgresLogDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'send-email-logs.ts',
        });
        await logDatasource.saveLogs(log);
        await logDatasource.saveLogs(log);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(2);
        expect(logs[0]).toEqual(log);
        expect(logs[1]).toEqual(log);
    });
});