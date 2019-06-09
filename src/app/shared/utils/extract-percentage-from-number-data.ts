import { NumberData } from 'src/app/shared/interfaces';

export function extractPercentageFromNumberData(numberData: NumberData): number {
    return numberData.percentage;
}
