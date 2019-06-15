import { Score } from 'src/app/shared/interfaces/score';

export function minMaxDifferenceScoreNumbers(score: Score): number {
    return Math.max(...score.numbers) - Math.min(...score.numbers);
}
