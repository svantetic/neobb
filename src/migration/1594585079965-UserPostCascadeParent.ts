import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPostCascadeParent1594585079965 implements MigrationInterface {
    name = 'UserPostCascadeParent1594585079965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_b148d2f5a22e7904160c69b09f8`");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_b148d2f5a22e7904160c69b09f8` FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_b148d2f5a22e7904160c69b09f8`");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_b148d2f5a22e7904160c69b09f8` FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
