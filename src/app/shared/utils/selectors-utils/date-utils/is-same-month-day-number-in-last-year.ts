import { Score } from 'src/app/shared/interfaces/score';
import { isSameMonthDayNumber } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-month-day-number';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isSameMonthDayNumberInLastYear(score: Score): boolean {
    return isSameMonthDayNumber(score) && isInLastYear(score);
}
