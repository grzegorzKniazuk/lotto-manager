import { map } from 'lodash';
import { extractBallNumberFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-ball-number-from-number-data';
import { BallValuePercentageArray } from 'src/app/shared/types';

export function mapNumberDataArrayToBallNumberArray(numberDataArray: BallValuePercentageArray): number[] {
    return map(numberDataArray, extractBallNumberFromNumberData);
}
