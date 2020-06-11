import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreateAndUpdateColumns1591911697906 implements MigrationInterface {
    name = 'AddCreateAndUpdateColumns1591911697906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `thread` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `thread` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `thread` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `thread` DROP COLUMN `createdAt`");
    }

}
