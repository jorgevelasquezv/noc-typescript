import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import {
    LogEntity,
    LogSeverityLevel,
} from '../../../src/domain/entities/log-entity';
describe('log.datasource.ts LogDatasource', () => {
    const mockLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    });

    class MockLogDatasource implements LogDatasource {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [mockLog];
        }
    }

    test('Should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource();
        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.getLogs).toBe('function');
        expect(typeof mockLogDatasource.saveLogs).toBe('function');

        await mockLogDatasource.saveLogs(mockLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toEqual([mockLog]);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs).toHaveLength(1);
    });
});
