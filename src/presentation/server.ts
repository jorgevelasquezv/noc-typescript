import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-services';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.impl';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronServices } from './cron/cron-services';
import { EmailServices } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const emailServices = new EmailServices();
export class Server {
    public static start(): void {
        console.log('Server started');

        new SendEmailLogs(emailServices, fileSystemLogRepository).execute([
            'jorge.velasquez@pragma.com.co',
        ]);

        // emailServices.sendEmail({
        //     to: 'jorge.velasquez@pragma.com.co',
        //     subject: 'Log the system',
        //     htmlBody: `
        //     <h3>Logs the system - NOC</h3>
        //     <p>Anim proident consectetur ut officia excepteur commodo nulla tempor cupidatat magna. Proident eiusmod minim voluptate occaecat minim et dolor in eu minim nostrud id. Aliqua id ad ea nisi exercitation ut consectetur officia ipsum tempor quis. Consectetur minim amet enim mollit cupidatat sit do ad. Ex nulla sint esse sunt est nulla irure magna sint cillum. Proident amet anim velit ea exercitation pariatur sit minim. Anim exercitation proident pariatur laborum nisi esse officia.</p>
        //     <p>See logs attachment</p>
        //     `,
        // });

        // Send Email with logs
        // emailServices.sendEmailWithFileSystemLogs('jorge.velasquez@pragma.com.co');

        // CronServices.createJob('*/5 * * * * *', () => {
        //     // const url = 'http://google.com';
        //     const url = 'http://localhost:3000/posts';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`Service ${url} is ok`),
        //         error => console.log(error)
        //     ).execute(url);
        // });
    }
}
