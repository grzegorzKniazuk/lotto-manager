import { ScoreNumbersExpression } from 'src/app/shared/enums';

export const GeneralStatisticsTitlesMap = {
    [ScoreNumbersExpression.SUM]: 'Suma liczb w losowaniu',
    [ScoreNumbersExpression.AVERAGE]: 'Średnia liczb w losowaniu',
    [ScoreNumbersExpression.MIN_MAX_DIFFERENCE]: 'Różnica pomiędzy największą i najmniejszą liczbą w losowaniu',
    [ScoreNumbersExpression.MEDIAN]: 'Mediana liczb w losowaniu',
    [ScoreNumbersExpression.MEDIAN_ABSOLUTE_DEVIATION]: 'Średnie odchylenie bezwzględne liczb w losowaniu',
    [ScoreNumbersExpression.PRODUCT]: 'Iloczyn liczb w losowaniu',
    [ScoreNumbersExpression.STANDARD_DEVIATION]: 'Odchylenie standardowe liczb w losowaniu',
    [ScoreNumbersExpression.GREATEST_COMMON_DIVISOR]: 'Największy wspólny dzielnik liczb w losowaniu',
    [ScoreNumbersExpression.LEAST_COMMON_MULTIPLE]: 'Najmniejsza wspólna wielokrotność liczb w losowaniu',
};
