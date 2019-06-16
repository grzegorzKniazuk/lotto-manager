import { Score } from 'src/app/shared/interfaces/score';
import { ExpressionScore } from 'src/app/shared/enums';
import { forEach } from 'lodash';
import { ScoreExpressionsMap } from 'src/app/shared/constants';

export function dateValueMapByExpression(scores: Score[]): (expressions: ExpressionScore[]) => Map<string, number> {

    return function (expressions: ExpressionScore[]): Map<string, number> {
        const dateValueMap = new Map<string, number>();

        forEach(expressions, (expression: ExpressionScore) => {
            forEach(scores, (score: Score) => {
                const calculatedValue = ScoreExpressionsMap[expression](score.numbers);

                dateValueMap.set(score.date, calculatedValue);
            });
        });

        return dateValueMap;
    };
}
