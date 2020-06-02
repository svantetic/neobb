const ORMConfig = {
    driver: 'mysq',
    type: 'mysql',
    host: 'localhost',
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    entities: [__dirname + '/../**/**.entity{.ts,.js}'],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    migrationsTableName: "custom_migration_table",
    migrations: ["migration/*.ts"],
    cli: {
        migrationsDir: "migration"
    },
};

export = ORMConfig;
