import { MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from 'faker';

export class SeedSegments1562949510560 implements MigrationInterface {
    SEGMENTS_COUNT = 4;
    public async up(queryRunner: QueryRunner): Promise<any> {
        for (let i = 0; i < this.SEGMENTS_COUNT; i++) {
            await queryRunner.query(`
                INSERT INTO segment values (
                    0,
                    "${faker.lorem.words(3)}"
                )
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
