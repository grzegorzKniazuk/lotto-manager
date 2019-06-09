import { NumberData } from 'src/app/shared/interfaces';
import { mapValuesToBallValuePercentage } from 'src/app/shared/utils/map-values-to-ball-value-percentage';

export function mapNumbersArrayToBallValuePercentage(array: number[]): NumberData[] {
    const result = {};

    array.forEach(number => {
        if (result.hasOwnProperty(number)) {
            result[number] = result[number] + 1;
        } else {
            Object.defineProperty(result, number, { value: 1, writable: true, configurable: true, enumerable: true });
        }
    });
    return mapValuesToBallValuePercentage(result)(array.length);
}
