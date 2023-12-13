import { LogEntity, LogSeverityLevel } from '../entities/log-entity';

export abstract class LogRepository {
    abstract saveLogs(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
