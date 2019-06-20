import { BallValuePercentage } from 'src/app/shared/interfaces';

export function extractBallNumberFromNumberData(numberData: BallValuePercentage): number {
    return numberData.ball;
}
