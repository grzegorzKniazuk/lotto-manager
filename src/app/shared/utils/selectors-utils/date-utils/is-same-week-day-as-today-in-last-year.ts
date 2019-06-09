import { Score } from 'src/app/shared/interfaces/score';
import { isSameWeekDayAsToday } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-week-day-as-today';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isSameWeekDayAsTodayInLastYear(score: Score): boolean {
    return isSameWeekDayAsToday(score) && isInLastYear(score);
}
