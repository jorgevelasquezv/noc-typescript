
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity{
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor( message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createAt = new Date();
        
    }

    static fromJson(json: string): LogEntity {
        const { level, message, createAt } = JSON.parse(json);
        if (!level || !message || !createAt) {
            throw new Error('Invalid JSON');
        }
        const log = new LogEntity(message, level);
        log.createAt = new Date(createAt);
        return log;
    }
}