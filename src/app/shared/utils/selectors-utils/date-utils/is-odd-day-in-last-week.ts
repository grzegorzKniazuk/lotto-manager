import { Score } from 'src/app/shared/interfaces/score';
import { isOddDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-odd-day';
import { isInLastWeek } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-week';

export function isOddDayInLastWeek(score: Score): boolean {
    return isOddDay(score) && isInLastWeek(score);
}
