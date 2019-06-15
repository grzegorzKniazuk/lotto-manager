import { Score } from 'src/app/shared/interfaces/score';
import { map, isNumber } from 'lodash';

export function filterScoresNumbersArrayByIndex(scores: Score[], index: number | number[]): Score[] {
    return map(scores, score => ({
        ...score,
        numbers: isNumber(index)
            ? [ score.numbers[index] ]
            : score.numbers.filter((n: number, i: number) => (index.includes(i)))
    }));
}
