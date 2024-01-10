import { EmailServices } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log-entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailServices: EmailServices,
        private readonly logRepository : LogRepository
    ) { }
    
    async execute(to: string | string[]) {

        try {
            const sent = await this.emailServices.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                message: `Email log sent to ${to}`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts',
            });
            this.logRepository.saveLogs(log);
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `Email log not sent. ${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts',
            });
            this.logRepository.saveLogs(log);
            return false;
        }

    }
}