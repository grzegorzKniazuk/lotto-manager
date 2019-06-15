import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { mapNumberKeyValueObjectToBallValuePercentage } from 'src/app/shared/utils/selectors-utils/map-number-key-value-object-to-ball-value-percentage';

export function mapNumbersArrayToBallValuePercentage(array: number[] = []): NumberBallValuePercentage[] {
    const result = {};

    array.forEach(number => {
        if (result.hasOwnProperty(number)) {
            result[number] = result[number] + 1;
        } else {
            Object.defineProperty(result, number, { value: 1, writable: true, configurable: true, enumerable: true });
        }
    });
    return mapNumberKeyValueObjectToBallValuePercentage(result)(array.length);
}
