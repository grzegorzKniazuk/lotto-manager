import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

export function extractBallNumberFromNumberData(numberData: NumberBallValuePercentage): number {
    return numberData.ball;
}
