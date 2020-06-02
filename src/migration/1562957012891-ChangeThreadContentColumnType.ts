import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeThreadContentColumnType1562957012891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `thread` DROP COLUMN `content`");
        await queryRunner.query("ALTER TABLE `thread` ADD `content` longtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `thread` DROP COLUMN `content`");
        await queryRunner.query("ALTER TABLE `thread` ADD `content` varchar(255) NOT NULL");
    }

}
