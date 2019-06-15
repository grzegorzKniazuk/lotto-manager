import { lcm } from 'mathjs';

export function leastCommonMultiple(numbers: number[]): number {
    // @ts-ignore
    return lcm(...numbers);
}
