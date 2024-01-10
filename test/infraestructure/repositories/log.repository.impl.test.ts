import {
    LogEntity,
    LogSeverityLevel,
} from './../../../src/domain/entities/log-entity';
import { LogRepositoryImpl } from './../../../src/infrastructure/repositories/log.repository.impl';
describe('log.repository.impl.ts LogRepositoryImpl', () => {
    const mockLogDatasource = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the data source whit arguments', async () => {
        const log = {
            level: LogSeverityLevel.high,
            message: 'hola',
        } as LogEntity;

        await logRepositoryImpl.saveLogs(log);
        expect(mockLogDatasource.saveLogs).toHaveBeenCalledTimes(1);
        expect(mockLogDatasource.saveLogs).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the data source whit arguments', async () => {
        const severityLevel = LogSeverityLevel.high;
        await logRepositoryImpl.getLogs(severityLevel);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledTimes(1);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
    });
});
