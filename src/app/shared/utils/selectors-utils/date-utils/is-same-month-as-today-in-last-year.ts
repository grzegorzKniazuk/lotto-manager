import { Score } from 'src/app/shared/interfaces/score';
import { isSameMonthAsToday } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-month-as-today';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isSameMonthAsTodayInLastYear(score: Score): boolean {
    return isSameMonthAsToday(score) && isInLastYear(score);
}
