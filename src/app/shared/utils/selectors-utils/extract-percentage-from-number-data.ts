import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

export function extractPercentageFromNumberData(numberData: NumberBallValuePercentage): number {
    return numberData.percentage;
}
