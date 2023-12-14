import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    Server.start();
}
