import { Score } from 'src/app/shared/interfaces/score';
import { countBy } from 'lodash';

export function scoresCountBy(scores: Score[]): (scoreObjectKey: keyof Score) => { [key: string]: number } {
    return function (scoreObjectKey: keyof Score): { [key: string]: number } {
        return countBy(scores, scoreObjectKey);
    }
}
