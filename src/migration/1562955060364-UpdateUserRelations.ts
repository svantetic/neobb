import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserRelations1562955060364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_25e0f20868d8e3e95aeac132361`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_8a6cdd56be8ef9b327f2d154dfc`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `postsId`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `threadsId`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `threadsId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `postsId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_8a6cdd56be8ef9b327f2d154dfc` FOREIGN KEY (`postsId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_25e0f20868d8e3e95aeac132361` FOREIGN KEY (`threadsId`) REFERENCES `thread`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
