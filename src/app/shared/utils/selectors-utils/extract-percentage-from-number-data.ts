import { BallValuePercentage } from 'src/app/shared/interfaces';

export function extractPercentageFromNumberData(numberData: BallValuePercentage): number {
    return numberData.percentage;
}
