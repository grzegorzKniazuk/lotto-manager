import { map } from 'lodash';
import { extractPercentageFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-percentage-from-number-data';
import { BallValuePercentageArray } from 'src/app/shared/types';

export function mapNumberDataArrayToPercentageArray(numberDataArray: BallValuePercentageArray): number[] {
    return map(numberDataArray, extractPercentageFromNumberData);
}
