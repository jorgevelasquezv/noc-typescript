import { CheckService } from '../domain/use-cases/checks/check-services';
import { CronServices } from './cron/cron-services';

export class Server {
    public static start(): void {
        console.log('Server started');

        CronServices.createJob('*/5 * * * * *', () => {
            const url = 'http://google.com';
            new CheckService(
                () => console.log(`Service ${url} is ok`),
                (error) => console.log(error)
            ).execute(url);
        });
    }
}
