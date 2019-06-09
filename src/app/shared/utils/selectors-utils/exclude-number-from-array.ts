import { filter } from 'lodash';

export function excludeNumberFromArray(numbers: number[], excludeNumber: number): number[] {
    return filter(numbers, n => n !== excludeNumber);
}
