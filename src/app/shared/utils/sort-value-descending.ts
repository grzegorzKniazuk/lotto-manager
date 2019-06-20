import { BallValuePercentage } from 'src/app/shared/interfaces';

export function sortValueDescending(a: BallValuePercentage, b: BallValuePercentage): number {
    return b.value - a.value;
}
