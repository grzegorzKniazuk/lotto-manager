import { std } from 'mathjs';

export function standardDeviation(numbers: number[]): number {
    return std(numbers);
}
