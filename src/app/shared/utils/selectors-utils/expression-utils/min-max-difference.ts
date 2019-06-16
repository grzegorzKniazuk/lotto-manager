import { max, min, subtract } from 'mathjs';

export function minMaxDifference(numbers: number[]): number {
    return subtract(max(numbers), min(numbers)) as number;
}
