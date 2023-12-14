import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailServices {
    private transporter = createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs the system';
        const htmlBody = `
            <h3>Logs the system - NOC</h3>
            <p>Anim proident consectetur ut officia excepteur commodo nulla tempor cupidatat magna. Proident eiusmod minim voluptate occaecat minim et dolor in eu minim nostrud id. Aliqua id ad ea nisi exercitation ut consectetur officia ipsum tempor quis. Consectetur minim amet enim mollit cupidatat sit do ad. Ex nulla sint esse sunt est nulla irure magna sint cillum. Proident amet anim velit ea exercitation pariatur sit minim. Anim exercitation proident pariatur laborum nisi esse officia.</p>
            <p>See logs attachment</p>
            `;
        const attachments: Attachment[] = [
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
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments,
        });
    }
}
