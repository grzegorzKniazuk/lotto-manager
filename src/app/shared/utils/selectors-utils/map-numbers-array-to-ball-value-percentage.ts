import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { mapBonusNumbersCountedToBallValuePercentage } from 'src/app/shared/utils/selectors-utils/map-bonus-numbers-counted-to-ball-value-percentage';

export function mapNumbersArrayToBallValuePercentage(array: number[] = []): NumberBallValuePercentage[] {
    const result = {};

    array.forEach(number => {
        if (result.hasOwnProperty(number)) {
            result[number] = result[number] + 1;
        } else {
            Object.defineProperty(result, number, { value: 1, writable: true, configurable: true, enumerable: true });
        }
    });
    return mapBonusNumbersCountedToBallValuePercentage(result)(array.length);
}
