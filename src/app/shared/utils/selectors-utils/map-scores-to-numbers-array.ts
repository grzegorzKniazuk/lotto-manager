import { Score } from 'src/app/shared/interfaces/score';
import { flatten, map } from 'lodash';
import { pickNumbers } from 'src/app/shared/utils/selectors-utils/pick-numbers';

export function mapScoresToNumbersArray(scores: Score[]): number[] {
    return flatten(map(scores, pickNumbers));
}
