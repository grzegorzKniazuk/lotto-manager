import { NumberData } from 'src/app/shared/interfaces';
import { map } from 'lodash';
import { extractValueFromNumberData } from 'src/app/shared/utils/selectors-utils/extract-value-from-number-data';

export function mapNumberDataArrayToValueArray(numberDataArray: NumberData[]): number[] {
    return map(numberDataArray, extractValueFromNumberData);
}
