import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // const prisma = new PrismaClient();

    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test Message from mongo',
    //         origin: 'app.ts',
    //     },
    // });

    // console.log(newLog);

    // const logs = await prisma.logModel.findMany();
    // console.log(logs);
    

    // const newLog = await LogModel.create({
    //     level: 'high',
    //     message: 'Test Message from mongo',
    //     origin: 'app.ts',
    // });

    // await newLog.save();

    // const logs = await LogModel.find()
    // console.log(logs);

    Server.start();
}
