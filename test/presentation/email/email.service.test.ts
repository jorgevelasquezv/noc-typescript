import nodemailer from 'nodemailer';
import {
    EmailServices,
    SendMailOptions,
} from './../../../src/presentation/email/email.service';

describe('email.service.ts EmailService', () => {
    const mockSendMail = jest.fn();

    //mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailServices();

    test('Should send email', async () => {
        const options: SendMailOptions = {
            to: 'jorge.velasquez@google.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>',
        };

        const result = await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: '<h1>Test</h1>',
            subject: 'Test',
            to: 'jorge.velasquez@google.com',
        });

        expect(result).toBeTruthy();
    });

    test('Send email with attachment', async () => {
        const email = 'jorge.velasquez@google.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs the system',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                {
                    filename: 'logs-low.log',
                    path: './logs/logs-low.log',
                },
                {
                    filename: 'logs-high.log',
                    path: './logs/logs-high.log',
                },
                {
                    filename: 'logs-medium.log',
                    path: './logs/logs-medium.log',
                },
            ]),
        });
    });

});
