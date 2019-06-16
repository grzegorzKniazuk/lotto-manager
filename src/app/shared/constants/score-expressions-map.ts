import { ExpressionScore } from 'src/app/shared/enums';
import {
    average,
    greatestCommonDivisor,
    leastCommonMultiple,
    medianAbsoluteDeviation,
    medianArray,
    minMaxDifference,
    product,
    standardDeviation,
    sumArray,
} from 'src/app/shared/utils/selectors-utils/expression-utils';

export const ScoreExpressionsMap = {
    [ExpressionScore.SUM]: sumArray,
    [ExpressionScore.AVERAGE]: average,
    [ExpressionScore.MIN_MAX_DIFFERENCE]: minMaxDifference,
    [ExpressionScore.MEDIAN]: medianArray,
    [ExpressionScore.MEDIAN_ABSOLUTE_DEVIATION]: medianAbsoluteDeviation,
    [ExpressionScore.PRODUCT]: product,
    [ExpressionScore.STANDARD_DEVIATION]: standardDeviation,
    [ExpressionScore.GREATEST_COMMON_DIVISOR]: greatestCommonDivisor,
    [ExpressionScore.LEAST_COMMON_MULTIPLE]: leastCommonMultiple,
};
