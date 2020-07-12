import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPostCascade1594584828668 implements MigrationInterface {
    name = 'UserPostCascade1594584828668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
