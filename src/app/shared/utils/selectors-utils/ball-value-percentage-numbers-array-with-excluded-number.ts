import { NumberData } from 'src/app/shared/interfaces';
import { mapNumbersArrayToBallValuePercentage } from 'src/app/shared/utils/selectors-utils/map-numbers-array-to-ball-value-percentage';
import * as R from 'ramda';
import { excludeNumberFromArray } from 'src/app/shared/utils/selectors-utils/exclude-number-from-array';

export function ballValuePercentageNumbersArrayWithExcludedNumber(numbers: number[]): (ballNumber: number) => NumberData[] {
    return function (ballNumber): NumberData[] {
        return R.compose(mapNumbersArrayToBallValuePercentage, excludeNumberFromArray)(numbers, ballNumber);
    };
}
