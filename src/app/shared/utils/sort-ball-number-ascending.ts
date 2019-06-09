import { NumberData } from 'src/app/shared/interfaces';

export function sortBallNumberAscending(a: NumberData, b: NumberData): number {
    return a.ball - b.ball;
}
