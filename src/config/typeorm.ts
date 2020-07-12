import { join } from 'path';

const ORMConfig = {
    driver: 'mysql',
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    migrationsTableName: 'custom_migration_table',
    migrations: ['src/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration',
    },
};

export = ORMConfig;
