import { Score } from 'src/app/shared/interfaces/score';
import { ExpressionScore } from 'src/app/shared/enums';
import { forEach } from 'lodash';
import { ScoreExpressionsMap } from 'src/app/shared/constants';

export function dateValueMapByExpression(scores: Score[]): (expressions: ExpressionScore[]) => Map<string, number> {

    return function (expressions: ExpressionScore[]): Map<string, number> {
        const dateValueMap = new Map<string, number>();

        forEach(expressions, (expression: ExpressionScore) => {
            forEach(scores, (score: Score, index: number) => {
                let calculatedValue;
                if (expression === ExpressionScore.KULLBACK_LEIBLER_DIVERGENCE) {
                    if (scores[index - 1]) {
                        calculatedValue = ScoreExpressionsMap[expression](score.numbers, scores[index - 1].numbers);
                    }
                } else {
                    calculatedValue = ScoreExpressionsMap[expression](score.numbers);
                }

                dateValueMap.set(score.date, calculatedValue);
            });
        });

        return dateValueMap;
    };
}
