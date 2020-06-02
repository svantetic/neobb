export type ISelectIdQueryResult = Array<{
    id: number;
}>;

export const getRandomNumberBetween = (start: number, end: number) => Math.floor(Math.random() * end) + start;
