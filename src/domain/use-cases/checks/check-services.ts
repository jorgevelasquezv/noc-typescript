import { LogEntity, LogSeverityLevel } from '../../entities/log-entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly origin = 'check-services.ts'
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: this.origin,
            });
            this.logRepository.saveLogs(log);

            this.successCallback?.();

            return true;
        } catch (error) {
            const message = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message,
                level: LogSeverityLevel.high,
                origin: this.origin,
            });
            this.logRepository.saveLogs(log);

            this.errorCallback?.(message);

            return false;
        }
    }
}
