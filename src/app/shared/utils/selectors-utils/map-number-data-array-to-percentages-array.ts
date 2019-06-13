import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { map } from 'lodash';
import { extractPercentageFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-percentage-from-number-data';

export function mapNumberDataArrayToPercentageArray(numberDataArray: NumberBallValuePercentage[]): number[] {
    return map(numberDataArray, extractPercentageFromNumberData);
}
