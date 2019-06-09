import { NumberData } from 'src/app/shared/interfaces';
import { map } from 'lodash';
import { extractPercentageFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-percentage-from-number-data';

export function mapNumberDataArrayToPercentageArray(numberDataArray: NumberData[]): number[] {
    return map(numberDataArray, extractPercentageFromNumberData);
}
