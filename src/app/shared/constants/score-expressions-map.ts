import { ExpressionScore } from 'src/app/shared/enums';
import { averageScoreNumbers, minMaxDifferenceScoreNumbers, sumScoreNumbers } from 'src/app/shared/utils/selectors-utils/expression-utils';

export const ScoreExpressionsMap = {
    [ExpressionScore.SUM]: sumScoreNumbers,
    [ExpressionScore.AVERAGE]: averageScoreNumbers,
    [ExpressionScore.MIN_MAX_DIFFERENCE]: minMaxDifferenceScoreNumbers,
};
