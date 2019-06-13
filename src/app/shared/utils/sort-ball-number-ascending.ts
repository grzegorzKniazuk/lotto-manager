import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

export function sortBallNumberAscending(a: NumberBallValuePercentage, b: NumberBallValuePercentage): number {
    return a.ball - b.ball;
}
