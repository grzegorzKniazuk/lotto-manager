import { Score } from 'src/app/shared/interfaces/score';

export function pickNumbers(score: Score): number[] {
    return score.numbers;
}
