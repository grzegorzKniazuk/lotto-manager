import { Score } from 'src/app/shared/interfaces/score';
import { isEvenMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-even-month';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isEvenMonthInLastYear(score: Score): boolean {
    return isEvenMonth(score) && isInLastYear(score);
}
