import { Score } from 'src/app/shared/interfaces/score';
import { sumScoreNumbers } from 'src/app/shared/utils/selectors-utils/expression-utils/sum-score-numbers';

export function averageScoreNumbers(score: Score): number {
    return sumScoreNumbers(score) / 5;
}
