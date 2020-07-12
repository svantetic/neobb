import {MigrationInterface, QueryRunner} from "typeorm";

export class SectionLatestPostCascade1594585472038 implements MigrationInterface {
    name = 'SectionLatestPostCascade1594585472038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` DROP FOREIGN KEY `FK_6f5fdd06fee7b1d0e703e0e5d0e`");
        await queryRunner.query("ALTER TABLE `section` ADD CONSTRAINT `FK_6f5fdd06fee7b1d0e703e0e5d0e` FOREIGN KEY (`latestPostId`) REFERENCES `post`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` DROP FOREIGN KEY `FK_6f5fdd06fee7b1d0e703e0e5d0e`");
        await queryRunner.query("ALTER TABLE `section` ADD CONSTRAINT `FK_6f5fdd06fee7b1d0e703e0e5d0e` FOREIGN KEY (`latestPostId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
