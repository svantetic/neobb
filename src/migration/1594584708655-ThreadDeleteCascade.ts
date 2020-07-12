import {MigrationInterface, QueryRunner} from "typeorm";

export class ThreadDeleteCascade1594584708655 implements MigrationInterface {
    name = 'ThreadDeleteCascade1594584708655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `thread` DROP FOREIGN KEY `FK_7060c5e0b10f141ce2ca501bc13`");
        await queryRunner.query("DROP INDEX `IDX_6f5fdd06fee7b1d0e703e0e5d0` ON `section`");
        await queryRunner.query("ALTER TABLE `thread` ADD CONSTRAINT `FK_7060c5e0b10f141ce2ca501bc13` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `to_be_activated` ADD CONSTRAINT `FK_46ea9e62cbe1f77be13f485455c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `to_be_activated` DROP FOREIGN KEY `FK_46ea9e62cbe1f77be13f485455c`");
        await queryRunner.query("ALTER TABLE `thread` DROP FOREIGN KEY `FK_7060c5e0b10f141ce2ca501bc13`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_6f5fdd06fee7b1d0e703e0e5d0` ON `section` (`latestPostId`)");
        await queryRunner.query("ALTER TABLE `thread` ADD CONSTRAINT `FK_7060c5e0b10f141ce2ca501bc13` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
