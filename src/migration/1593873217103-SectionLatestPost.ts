import {MigrationInterface, QueryRunner} from "typeorm";
import { query } from 'express';

export class SectionLatestPost1593873217103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` ADD `latestPostId` int");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `section` DROP COLUMN `latestPostId`");
    }

}
