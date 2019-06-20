import { map } from 'lodash';
import { extractValueFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-value-from-number-data';
import { BallValuePercentageArray } from 'src/app/shared/types';

export function mapNumberDataArrayToValueArray(numberDataArray: BallValuePercentageArray): number[] {
    return map(numberDataArray, extractValueFromNumberData);
}
