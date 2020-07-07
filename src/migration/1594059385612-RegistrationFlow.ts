import { MigrationInterface, QueryRunner } from 'typeorm';

export class RegistrationFlow1594059385612 implements MigrationInterface {
    name = 'RegistrationFlow1594059385612';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `to_be_activated` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `userId` int NULL, UNIQUE INDEX `REL_46ea9e62cbe1f77be13f485455` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
        );
        await queryRunner.query(
            'ALTER TABLE `user` ADD `active` tinyint NOT NULL',
        );
        await queryRunner.query(
            'ALTER TABLE `to_be_activated` ADD CONSTRAINT `FK_46ea9e62cbe1f77be13f485455c` FOREIGN KEY (`userId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `to_be_activated` DROP FOREIGN KEY `FK_46ea9e62cbe1f77be13f485455c`',
        );
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `active`');
        await queryRunner.query(
            'DROP INDEX `REL_46ea9e62cbe1f77be13f485455` ON `to_be_activated`',
        );
        await queryRunner.query('DROP TABLE `to_be_activated`');
    }
}
