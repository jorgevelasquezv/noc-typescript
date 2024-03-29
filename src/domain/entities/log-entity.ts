export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createAt?: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createAt = createAt;
    }

    static fromJson(json: string): LogEntity {
        const { level, message, origin, createAt } = JSON.parse(json);
        if (!level || !message || !createAt) {
            throw new Error('Invalid JSON');
        }
        const log = new LogEntity({
            message,
            level,
            origin,
            createAt: new Date(createAt),
        });
        return log;
    }

    static fromObject(object: { [key: string]: any }): LogEntity {
        const { level, message, origin, createAt } = object;
        if (!level || !message || !origin || !createAt) {
            throw new Error('Invalid Object');
        }
        const log = new LogEntity({
            message,
            level: level.toLowerCase(),
            origin,
            createAt: new Date(createAt),
        });
        return log;
    }
}
