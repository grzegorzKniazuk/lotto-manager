import { ScoreNumbersExpression } from '../enums';

export interface ScoreQueryParams {
    expression: ScoreNumbersExpression;
    startDate?: string;
    endDate?: string;
    indexes?: number[];
}
