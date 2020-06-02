import {MigrationInterface, QueryRunner} from "typeorm";

export class init1562793514493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL DEFAULT '', `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `threadsId` int NULL, `postsId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `segment` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `section` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `segmentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `thread` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `authorId` int NULL, `sectionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `content` text NOT NULL, `threadId` int NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_25e0f20868d8e3e95aeac132361` FOREIGN KEY (`threadsId`) REFERENCES `thread`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_8a6cdd56be8ef9b327f2d154dfc` FOREIGN KEY (`postsId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `section` ADD CONSTRAINT `FK_578cf6faef3ff2daca4396b4f3e` FOREIGN KEY (`segmentId`) REFERENCES `segment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `thread` ADD CONSTRAINT `FK_7060c5e0b10f141ce2ca501bc13` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `thread` ADD CONSTRAINT `FK_2833860db818aa2ea7efde42ae5` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_b148d2f5a22e7904160c69b09f8` FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_b148d2f5a22e7904160c69b09f8`");
        await queryRunner.query("ALTER TABLE `thread` DROP FOREIGN KEY `FK_2833860db818aa2ea7efde42ae5`");
        await queryRunner.query("ALTER TABLE `thread` DROP FOREIGN KEY `FK_7060c5e0b10f141ce2ca501bc13`");
        await queryRunner.query("ALTER TABLE `section` DROP FOREIGN KEY `FK_578cf6faef3ff2daca4396b4f3e`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_8a6cdd56be8ef9b327f2d154dfc`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_25e0f20868d8e3e95aeac132361`");
        await queryRunner.query("DROP TABLE `post`");
        await queryRunner.query("DROP TABLE `thread`");
        await queryRunner.query("DROP TABLE `section`");
        await queryRunner.query("DROP TABLE `segment`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
