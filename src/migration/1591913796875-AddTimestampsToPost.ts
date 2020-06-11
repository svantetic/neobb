import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTimestampsToPost1591913796875 implements MigrationInterface {
    name = 'AddTimestampsToPost1591913796875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `post` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `createdAt`");
    }

}
