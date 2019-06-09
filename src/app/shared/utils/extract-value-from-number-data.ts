import { NumberData } from 'src/app/shared/interfaces';

export function extractValueFromNumberData(numberData: NumberData): number {
    return numberData.value;
}
