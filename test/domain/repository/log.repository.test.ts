import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log-entity";

describe('log.repository.ts LogRepository', () => {
    const mockLog = new LogEntity({
        origin: 'log.repository.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    });

    class MockLogRepository {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [mockLog];
        }
    }

    test('Should test the abstract class', async () => {
        const mockLogRepository = new MockLogRepository();
        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(typeof mockLogRepository.getLogs).toBe('function');
        expect(typeof mockLogRepository.saveLogs).toBe('function');

        await mockLogRepository.saveLogs(mockLog);
        const logs = await mockLogRepository.getLogs(LogSeverityLevel.low);
        expect(logs).toEqual([mockLog]);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs).toHaveLength(1);
    });
});