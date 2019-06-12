import { Score } from 'src/app/shared/interfaces/score';
import { filter } from 'lodash';

export function filterScore(scores: Score[], scoreFilterArray: ((score: Score) => boolean)[] = []) {
    let filteredScores;

    while (scoreFilterArray.length) {
        filteredScores = filter(scores, scoreFilterArray.shift());
    }
    return filteredScores ? filteredScores : scores;
}
