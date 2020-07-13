import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDeleteSection1594671618071 implements MigrationInterface {
    name = 'CascadeDeleteSection1594671618071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` DROP FOREIGN KEY `FK_578cf6faef3ff2daca4396b4f3e`");
        await queryRunner.query("ALTER TABLE `section` ADD CONSTRAINT `FK_578cf6faef3ff2daca4396b4f3e` FOREIGN KEY (`segmentId`) REFERENCES `segment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` DROP FOREIGN KEY `FK_578cf6faef3ff2daca4396b4f3e`");
        await queryRunner.query("ALTER TABLE `section` ADD CONSTRAINT `FK_578cf6faef3ff2daca4396b4f3e` FOREIGN KEY (`segmentId`) REFERENCES `segment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
