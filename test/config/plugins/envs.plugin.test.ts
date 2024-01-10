import { envs } from './../../../src/config/plugins/envs.plugin';

describe('envs.plugin.ts', () => {
    test('Should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'jorgeluisvelasquezv@gmail.com',
            MAILER_SECRET_KEY: 'hmnuhomraehicudk',
            PROD: false,
            MONGO_URL: 'mongodb://jorge:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC',
            MONGO_USER: 'jorge',
            MONGO_PASS: '123456',
            POSTGRES_USER: 'postgres',
            POSTGRES_PASS: 'postgres',
            POSTGRES_DB: 'NOC',
        });
    });

    test('Should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABCD';

        try {
            await import('./../../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});
