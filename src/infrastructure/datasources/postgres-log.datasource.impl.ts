import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entity';

const prisma = new PrismaClient();

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
    async saveLogs(log: LogEntity): Promise<void> {
        const level = severityLevelEnum[log.level];
        await prisma.logModel.create({
            data: {
                ...log,
                level,
            },
        });
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityLevelEnum[severityLevel];

        const logs = await prisma.logModel.findMany({
            where: {
                level,
            },
        });
        console.log({logs});
        
        return logs.map(LogEntity.fromObject);
    }
}
