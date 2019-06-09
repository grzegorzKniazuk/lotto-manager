import { NumberData } from 'src/app/shared/interfaces';

export function sortValueDescending(a: NumberData, b: NumberData): number {
    return b.value - a.value;
}
