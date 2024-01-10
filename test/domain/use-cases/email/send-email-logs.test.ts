import { SendEmailLogs } from './../../../../src/domain/use-cases/email/send-email-logs';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { LogEntity } from '../../../../src/domain/entities/log-entity';
import exp from 'constants';

describe('send-email-logs.ts SendEmailLogs', () => {
    const mockEmailServices = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    };
    const mockLogRepository: LogRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn(),
    };
    const sendEmailLogs = new SendEmailLogs(
        mockEmailServices as any,
        mockLogRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call sendEmail and saveLogs', async () => {
        const result = await sendEmailLogs.execute(
            'jorge.velasquez@pragma.com.co'
        );
        expect(result).toBe(true);
        expect(
            mockEmailServices.sendEmailWithFileSystemLogs
        ).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            createAt: expect.any(Date),
            level: 'low',
            message: 'Email log sent to jorge.velasquez@pragma.com.co',
            origin: 'send-email-logs.ts',
        });
    });

    test('Should call sendEmail and saveLogs when sendEmail return false', async () => {
        mockEmailServices.sendEmailWithFileSystemLogs.mockReturnValue(false);
        const result = await sendEmailLogs.execute(
            'jorge.velasquez@pragma.com.co'
        );
        expect(result).toBe(false);
        expect(
            mockEmailServices.sendEmailWithFileSystemLogs
        ).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            createAt: expect.any(Date),
            level: 'high',
            message: 'Email log not sent. Error: Email log not sent',
            origin: 'send-email-logs.ts',
        });
    });
});
