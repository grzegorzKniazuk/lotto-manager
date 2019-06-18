import { ScoreExpression } from '../enums';

export interface ScoreQueryParams {
    expression: ScoreExpression;
    startDate?: string;
    endDate?: string;
    indexes?: number[];
}
