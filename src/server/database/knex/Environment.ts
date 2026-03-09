import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'database.sqlite',
        ),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        },
    },
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};

export const production: Knex.Config = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    connection: {
        host: process.env.DATBASE_HOST,
        user: process.env.DATBASE_USER,
        database: process.env.DATBASE_NAME,
        password: process.env.DATBASE_PASSWORD,
        port: Number(process.env.DATBASE_PORT || 5432),
        ssl: { rejectUnauthorized: false },
    },
};
