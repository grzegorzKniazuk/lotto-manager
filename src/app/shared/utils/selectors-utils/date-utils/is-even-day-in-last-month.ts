import { Score } from 'src/app/shared/interfaces/score';
import { isEvenDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-even-day';
import { isInLastMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-month';

export function isEvenDayInLastMonth(score: Score): boolean {
    return isEvenDay(score) && isInLastMonth(score);
}
