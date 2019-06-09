import { Score } from 'src/app/shared/interfaces/score';
import { includes } from 'lodash';

export function isScoreNumbersIncludes(score: Score, searchNumber: number): boolean {
    return includes(score.numbers, searchNumber);
}
