import fs from 'fs';

import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entity';

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
            path => {
                if (!fs.existsSync(path)) {
                    fs.writeFileSync(path, '');
                }
            }
        );
    };

    async saveLogs(log: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        switch (log.level) {
            case LogSeverityLevel.medium:
                fs.appendFileSync(this.mediumLogsPath, logAsJson);
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync(this.highLogsPath, logAsJson);
                break;
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        const logs = content
            .split('\n')
            .filter(log => log !== '')
            .map(LogEntity.fromJson);
        return logs;
    };
}
