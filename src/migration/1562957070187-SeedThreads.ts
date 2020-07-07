import { MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from 'faker';
import { ISelectIdQueryResult, getRandomNumberBetween } from './helpers';

export class SeedThreads1562955773810 implements MigrationInterface {
    THREADS_COUNT = 20;
    public async up(queryRunner: QueryRunner): Promise<any> {
        const usersQueryResult: ISelectIdQueryResult = await queryRunner.query(
            'SELECT id FROM user',
        );
        const sectionsQueryResult: ISelectIdQueryResult = await queryRunner.query(
            'SELECT id FROM segment',
        );

        const userIds: number[] = usersQueryResult.map(user => user.id);
        const sectionIds: number[] = sectionsQueryResult.map(
            section => section.id,
        );

        await sectionIds.forEach(async section => {
            for (let i = 0; i < this.THREADS_COUNT; i++) {
                const randomUserId =
                    userIds[getRandomNumberBetween(0, userIds.length)];
                await queryRunner.query(`
                    INSERT INTO thread VALUES (
                        0,
                        "${faker.lorem.words(4)}",
                        ${randomUserId},
                        ${section},
                        "${faker.lorem.paragraphs(2)}"
                    )
                `);
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE FROM thread');
    }
}
