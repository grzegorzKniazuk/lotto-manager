import { multinomial } from 'mathjs';

export function multinominalCoefficients(numbers: number[]): number {
    return multinomial(numbers) as number;
}
