import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

export function extractValueFromNumberData(numberData: NumberBallValuePercentage): number {
    return numberData.value;
}
