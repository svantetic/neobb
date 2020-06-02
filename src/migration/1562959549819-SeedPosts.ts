import {MigrationInterface, QueryRunner} from "typeorm";
import { ISelectIdQueryResult, getRandomNumberBetween } from './helpers';
import * as faker from 'faker';

export class SeedPosts1562958562403 implements MigrationInterface {
    POSTS_COUNT = 50;
    public async up(queryRunner: QueryRunner): Promise<any> {
        const threadQueryResult: ISelectIdQueryResult = await queryRunner.query('SELECT id FROM thread');
        const userQueryResult: ISelectIdQueryResult = await queryRunner.query('SELECT id FROM user');

        const threadIds: number[] = threadQueryResult.map(thread => thread.id);
        const userIds: number[] = userQueryResult.map(thread => thread.id);

        await threadIds.forEach(async (thread) => {
            for (let i = 0; i < this.POSTS_COUNT; i++) {
                const randomUserId = userIds[getRandomNumberBetween(0, userIds.length)];
                await queryRunner.query(`
                    INSERT INTO post VALUES (
                        0,
                        "${faker.lorem.paragraph(5)}",
                        ${thread},
                        ${randomUserId}
                    )`);
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE FROM post');
    }

}
