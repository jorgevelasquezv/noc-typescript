import { FileSystemDatasource } from './../../../src/infrastructure/datasources/file-system.datasource.impl';
import fs from 'fs';
import path from 'path';
import {
    LogEntity,
    LogSeverityLevel,
} from '../../../src/domain/entities/log-entity';

describe('file-system.datasource.impl.ts FileSystemDatasource', () => {
    const logPath = path.join(__dirname, '../../../logs/');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('Should create log files if they do not exits', () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([
            'logs-high.log',
            'logs-low.log',
            'logs-medium.log',
        ]);
    });

    test('Should save a log in logs-low.log file', () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const log = {
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'test.ts',
        };
        fileSystemDatasource.saveLogs(log);
        const content = fs.readFileSync(logPath + 'logs-low.log', 'utf8');
        expect(content).toBe(JSON.stringify(log) + '\n');
    });

    test('Should save a log in all logs-low.log and logs-medium.log file', () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const log = {
            level: LogSeverityLevel.medium,
            message: 'test message',
            origin: 'test.ts',
        };
        fileSystemDatasource.saveLogs(log);
        const mediumLogs = fs.readFileSync(logPath + 'logs-medium.log', 'utf8');
        const lowLogs = fs.readFileSync(logPath + 'logs-low.log', 'utf8');
        expect(mediumLogs).toBe(JSON.stringify(log) + '\n');
        expect(lowLogs).toBe(JSON.stringify(log) + '\n');
    });

    test('Should save a log in all logs-low.log and logs-high.log file', () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const log = {
            level: LogSeverityLevel.high,
            message: 'test message',
            origin: 'test.ts',
        };
        fileSystemDatasource.saveLogs(log);
        const highLogs = fs.readFileSync(logPath + 'logs-high.log', 'utf8');
        const lowLogs = fs.readFileSync(logPath + 'logs-low.log', 'utf8');
        expect(highLogs).toBe(JSON.stringify(log) + '\n');
        expect(lowLogs).toBe(JSON.stringify(log) + '\n');
    });

    test('Should get all logs', async () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'test.ts',
        });

        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test message',
            origin: 'test.ts',
        });

        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test message',
            origin: 'test.ts',
        });

        fileSystemDatasource.saveLogs(logLow);
        fileSystemDatasource.saveLogs(logMedium);
        fileSystemDatasource.saveLogs(logHigh);
        const logsLow = await fileSystemDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await fileSystemDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await fileSystemDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual([logLow, logMedium, logHigh]);
        expect(logsMedium).toEqual([logMedium]);
        expect(logsHigh).toEqual([logHigh]);
    });

    test('Should throw an error if severity level is not implemented', async () => {
        const fileSystemDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: 'not implemented' as any,
            message: 'test message',
            origin: 'test.ts',
        });
        await expect(fileSystemDatasource.getLogs(log.level)).rejects.toThrow(
            `${log.level} not implemented`
        );
    });
});
