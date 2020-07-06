import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultInactiveUser1594059970743 implements MigrationInterface {
    name = 'DefaultInactiveUser1594059970743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `active` `active` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `active` `active` tinyint NOT NULL");
    }

}
