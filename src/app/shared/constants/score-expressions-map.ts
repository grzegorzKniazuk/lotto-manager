import { ExpressionScore } from 'src/app/shared/enums';
import {
    average, greatestCommonDivisor, hypotenus, kullbackLeiblerDivergence, leastCommonMultiple,
    medianAbsoluteDeviation,
    medianArray,
    minMaxDifference, multinominalCoefficients,
    product, standardDeviation,
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
    [ExpressionScore.MULTINOMINAL_COEFFICENTS]: multinominalCoefficients,
    [ExpressionScore.KULLBACK_LEIBLER_DIVERGENCE]: kullbackLeiblerDivergence,
    [ExpressionScore.GREATEST_COMMON_DIVISOR]: greatestCommonDivisor,
    [ExpressionScore.LEAST_COMMON_MULTIPLE]: leastCommonMultiple,
    [ExpressionScore.HYPOTENUS]: hypotenus,
};
