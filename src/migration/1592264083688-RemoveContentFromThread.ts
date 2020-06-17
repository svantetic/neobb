import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveContentFromThread1592264083688 implements MigrationInterface {
    name = 'RemoveContentFromThread1592264083688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `thread` DROP COLUMN `content`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `thread` ADD `content` longtext NOT NULL");
    }

}
