import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),

    //Mongo DB
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),

    //Postgres DB
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASS: env.get('POSTGRES_PASS').required().asString(),
    POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
};