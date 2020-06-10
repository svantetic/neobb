import {MigrationInterface, QueryRunner} from 'typeorm';
import bcrypt = require('bcryptjs');

export class SeedUsers1562955175716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO user VALUES (
                0,
                "admin",
                "",
                "admin@example.com",
                "${bcrypt.hashSync('admin', 5)}"
            )`,
        );

        await queryRunner.query(`
            INSERT INTO user VALUES (
                0,
                "user",
                "",
                "user@example.com",
                "${bcrypt.hashSync('user', 5)}"
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE FROM user');
    }

}
