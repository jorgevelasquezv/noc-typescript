import {
    LogEntity,
    LogSeverityLevel,
} from '../../../src/domain/entities/log-entity';

describe('log-entity.ts LogEntity', () => {
    const dataObj = {
        origin: 'log-entity.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
        createAt: new Date(),
    };

    test('Should create a LogEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('Should throw an error when create a LogEntity instance with invalid data from json', () => {
        const json = `{"level":"low","message":"Service http://localhost:3000/posts working"}`;
        expect(() => LogEntity.fromJson(json)).toThrow('Invalid JSON');
    });

    test('Should create a LogEntity instance from json', () => {
        const json = `{"level":"low","message":"Service http://localhost:3000/posts working","origin":"check-services.ts","createAt":"2023-12-14T21:57:40.042Z"}`;
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service http://localhost:3000/posts working');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('check-services.ts');
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('Should throw an error when create a LogEntity instance with invalid data from object', () => {
        const obj = {
            level: 'low',
            message: 'Service http://localhost:3000/posts working',
        };
        expect(() => LogEntity.fromObject(obj)).toThrow('Invalid Object');
    });

    test('Should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('Should throw an error when create a LogEntity instance with invalid data from object', () => {
        const obj = {
            level: 'low',
            message: 'Service http://localhost:3000/posts working',
        };
        expect(() => LogEntity.fromObject(obj)).toThrow('Invalid Object');
    });
});
