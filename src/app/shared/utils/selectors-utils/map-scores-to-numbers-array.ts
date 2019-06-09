import { Score } from 'src/app/shared/interfaces/score';
import { flatten, map, isUndefined } from 'lodash';
import { pickNumbers } from 'src/app/shared/utils/selectors-utils/pick-numbers';
import * as R from 'ramda';
import { pickOnIndex } from 'src/app/shared/utils/selectors-utils/pick-on-index';

export function mapScoresToNumbersArray(scores: Score[]): (numberIndex?: number) => number[] {
    return function (numberIndex?: number): number[] {
        if (!isUndefined(numberIndex)) {
            return R.compose(flatten, pickOnIndex)(scores, numberIndex);
        } else {
            return flatten(map(scores, pickNumbers));
        }
    }
}
