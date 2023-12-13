import { CheckService } from '../domain/use-cases/checks/check-services';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.impl';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronServices } from './cron/cron-services';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
export class Server {
    public static start(): void {
        console.log('Server started');

        CronServices.createJob('*/5 * * * * *', () => {
            // const url = 'http://google.com';
            const url = 'http://localhost:3000/posts';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`Service ${url} is ok`),
                error => console.log(error)
            ).execute(url);
        });
    }
}
