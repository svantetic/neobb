import { MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from 'faker';
import { ISelectIdQueryResult } from './helpers';

export class SeedSections1562950297175 implements MigrationInterface {
    SECTIONS_COUNT = 5;
    public async up(queryRunner: QueryRunner): Promise<any> {
        const segmentQueryResult: ISelectIdQueryResult = await queryRunner.query(
            'SELECT id from segment',
        );

        if (!segmentQueryResult || segmentQueryResult.length === 0) {
            return;
        }

        await segmentQueryResult.forEach(async (segment: { id: number }) => {
            for (let i = 0; i < this.SECTIONS_COUNT; i++) {
                await queryRunner.query(`
                    INSERT INTO section VALUES (
                        0,
                        "${faker.lorem.words(5)}",
                        "${faker.lorem.sentence(10)}",
                        ${segment.id}
                    )
                `);
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE FROM segment');
    }
}
