import { CronServices } from './../../../src/presentation/cron/cron-services';
describe('cron-services.ts Cron Services', () => {

    const mockTick = jest.fn();

    test('Should create a job', (done) => {
        const job = CronServices.createJob('* * * * * *', mockTick);
        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);
    });
});