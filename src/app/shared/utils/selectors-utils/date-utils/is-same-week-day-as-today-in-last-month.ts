import { Score } from 'src/app/shared/interfaces/score';
import { isSameWeekDayAsToday } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-week-day-as-today';
import { isInLastMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-month';

export function isSameWeekDayAsTodayInLastMonth(score: Score): boolean {
    return isSameWeekDayAsToday(score) && isInLastMonth(score);
}
