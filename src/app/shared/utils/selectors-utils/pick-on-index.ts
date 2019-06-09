import { Score } from 'src/app/shared/interfaces/score';
import { map } from 'lodash';

export function pickOnIndex(scores: Score[], index: number): number[] {
    return map(scores, score => score.numbers[index]);
}
