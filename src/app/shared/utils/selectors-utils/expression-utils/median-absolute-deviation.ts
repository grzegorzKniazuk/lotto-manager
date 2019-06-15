import { mad } from 'mathjs';

export function medianAbsoluteDeviation(numbers: number[]): number {
    return mad(numbers);
}
