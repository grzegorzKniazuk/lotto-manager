import { BallValuePercentage } from 'src/app/shared/interfaces';

export function extractValueFromNumberData(numberData: BallValuePercentage): number {
    return numberData.value;
}
