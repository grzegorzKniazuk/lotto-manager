import { Score } from 'src/app/shared/interfaces/score';
import { isOddMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-odd-month';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isOddMonthInLastYear(score: Score): boolean {
    return isOddMonth(score) && isInLastYear(score);
}
