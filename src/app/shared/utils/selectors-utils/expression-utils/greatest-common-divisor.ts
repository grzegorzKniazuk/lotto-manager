import { gcd } from 'mathjs';

export function greatestCommonDivisor(numbers: number[]): number {
    return gcd(...numbers);
}
