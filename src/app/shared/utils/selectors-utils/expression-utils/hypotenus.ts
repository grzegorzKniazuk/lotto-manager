import { hypot } from 'mathjs';

export function hypotenus(numbers: number[]): number {
    return hypot(...numbers);
}
