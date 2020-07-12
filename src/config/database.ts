import { join } from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
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
    migrations: ['dist/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration',
    },
}));
