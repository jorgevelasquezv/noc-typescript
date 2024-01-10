import { LogEntity } from '../../../../src/domain/entities/log-entity';
import { CheckService } from './../../../../src/domain/use-cases/checks/check-services';
describe('check-services.ts CheckServices use-cases', () => {
    const mockLogRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(
        mockLogRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call success callback when fetch return true', async () => {
        const result = await checkService.execute('http://google.com');
        expect(result).toBe(true);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call success callback when callback is undefined with fetch return true', async () => {
        const successCallback = undefined;
        const errorCallback = jest.fn();
        const checkService = new CheckService(
            mockLogRepository,
            successCallback,
            errorCallback
        );

        const result = await checkService.execute('http://google.com');
        expect(result).toBe(true);
        expect(errorCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when fetch return failure', async () => {
        const result = await checkService.execute('http://google22.com');
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when fetch no return ok', async () => {
        const result = await checkService.execute('http://google.com/404');
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when fetch throws an error', async () => {
        const result = await checkService.execute('http://invalid-url');
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when callback is undefined and with fetch throws an error', async () => {
        const successCallback = jest.fn();
        const errorCallback = undefined;
        const checkService = new CheckService(
            mockLogRepository,
            successCallback,
            errorCallback
        );

        const result = await checkService.execute('http://invalid-url');
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });   
});
