import { Score } from 'src/app/shared/interfaces/score';
import { isSameWeekDayAsToday } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-week-day-as-today';
import { isInLastWeek } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-week';

export function isSameWeekDayAsTodayInLastWeek(score: Score): boolean {
    return isSameWeekDayAsToday(score) && isInLastWeek(score);
}
