import { kldivergence } from 'mathjs';

export function kullbackLeiblerDivergence(numbersFromTwoDaysAgo: number[], numbersFromDayAgo: number[]): number {
    return kldivergence(numbersFromTwoDaysAgo, numbersFromDayAgo);
}
