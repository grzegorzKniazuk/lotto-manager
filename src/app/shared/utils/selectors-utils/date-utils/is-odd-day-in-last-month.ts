import { Score } from 'src/app/shared/interfaces/score';
import { isOddDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-odd-day';
import { isInLastMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-month';

export function isOddDayInLastMonth(score: Score): boolean {
    return isOddDay(score) && isInLastMonth(score);
}
