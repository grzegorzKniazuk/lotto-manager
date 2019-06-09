import { Score } from 'src/app/shared/interfaces/score';
import { isOddDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-odd-day';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isOddDayInLastYear(score: Score): boolean {
    return isOddDay(score) && isInLastYear(score);
}
