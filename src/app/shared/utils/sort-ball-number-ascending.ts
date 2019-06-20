import { BallValuePercentage } from 'src/app/shared/interfaces';

export function sortBallNumberAscending(a: BallValuePercentage, b: BallValuePercentage): number {
    return a.ball - b.ball;
}
