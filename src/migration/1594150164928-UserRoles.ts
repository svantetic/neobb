import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoles1594150164928 implements MigrationInterface {
    name = 'UserRoles1594150164928';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `user` ADD `role` enum ('USER', 'ADMIN', 'MODERATOR') NOT NULL DEFAULT 'USER'",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `role`');
    }
}
