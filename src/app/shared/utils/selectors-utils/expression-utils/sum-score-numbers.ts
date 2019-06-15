import { Score } from 'src/app/shared/interfaces/score';

export function sumScoreNumbers(score: Score): number {
    return score.numbers.reduce((acc, next) => acc + next, 0);
}
