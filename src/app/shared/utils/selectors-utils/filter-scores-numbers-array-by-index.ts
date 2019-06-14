import { Score } from 'src/app/shared/interfaces/score';
import { map } from 'lodash';

export function filterScoresNumbersArrayByIndex(scores: Score[], index: number): Score[] {
    return map(scores, score => ({
        ...score,
        numbers: [ score.numbers[index] ],
    }));
}
