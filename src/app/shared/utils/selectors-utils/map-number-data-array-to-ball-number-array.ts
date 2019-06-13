import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { map } from 'lodash';
import { extractBallNumberFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-ball-number-from-number-data';

export function mapNumberDataArrayToBallNumberArray(numberDataArray: NumberBallValuePercentage[]): number[] {
    return map(numberDataArray, extractBallNumberFromNumberData);
}
