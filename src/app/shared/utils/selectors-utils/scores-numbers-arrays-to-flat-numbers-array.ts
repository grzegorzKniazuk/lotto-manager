import { flatten, map } from 'lodash';
import { pickNumbers } from 'src/app/shared/utils/selectors-utils/pick-numbers';
import { Score } from 'src/app/shared/interfaces/score';

export function scoresNumbersArraysToFlatNumbersArray(scoresNumbers: Score[]): number[] {
    return flatten(map(scoresNumbers, pickNumbers));
}
