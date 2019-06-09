import { Score } from 'src/app/shared/interfaces/score';
import { isEvenDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-even-day';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isEvenDayInLastYear(score: Score): boolean {
    return isEvenDay(score) && isInLastYear(score);
}
