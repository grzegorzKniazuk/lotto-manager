import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

export function sortValueDescending(a: NumberBallValuePercentage, b: NumberBallValuePercentage): number {
    return b.value - a.value;
}
