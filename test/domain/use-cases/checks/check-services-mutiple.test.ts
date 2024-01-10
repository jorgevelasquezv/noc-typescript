import { LogEntity } from '../../../../src/domain/entities/log-entity';
import { CheckServiceMultiple } from './../../../../src/domain/use-cases/checks/check-services-mutiple';
describe('check-services-multiple.ts Check Services Mutiple', () => {
    const mockLogRepositoryOne = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockLogRepositoryTwo = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockLogRepositoryThree = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkServicesMultiple = new CheckServiceMultiple(
        [mockLogRepositoryOne, mockLogRepositoryTwo, mockLogRepositoryThree],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call success callback when fetch return true', async () => {
        const result = await checkServicesMultiple.execute('http://google.com');
        expect(result).toBe(true);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepositoryOne.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryTwo.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryThree.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call success callback when callback is undefined with fetch return true', async () => {
        const successCallback = undefined;
        const errorCallback = jest.fn();
        const checkServicesMultiple = new CheckServiceMultiple(
            [
                mockLogRepositoryOne,
                mockLogRepositoryTwo,
                mockLogRepositoryThree,
            ],
            successCallback,
            errorCallback
        );

        const result = await checkServicesMultiple.execute('http://google.com');
        expect(result).toBe(true);
        expect(errorCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepositoryOne.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryTwo.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryThree.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when fetch return failure', async () => {
        const result = await checkServicesMultiple.execute(
            'http://google22.com'
        );
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockLogRepositoryOne.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryTwo.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryThree.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when fetch no return ok', async () => {
        const result = await checkServicesMultiple.execute(
            'http://google.com/404'
        );
        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(mockLogRepositoryOne.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryTwo.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryThree.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('Should call error callback when error callback is undefined with fetch return failure', async () => {
        const errorCallback = undefined;
        const checkServiceMultiple = new CheckServiceMultiple(
            [
                mockLogRepositoryOne,
                mockLogRepositoryTwo,
                mockLogRepositoryThree,
            ],
            successCallback,
            errorCallback
        );

        const result = await checkServiceMultiple.execute(
            'http://google.com/404'
        );

        expect(result).toBe(false);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(mockLogRepositoryOne.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
});
