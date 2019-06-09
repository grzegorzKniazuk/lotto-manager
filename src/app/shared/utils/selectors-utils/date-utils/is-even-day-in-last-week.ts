import { Score } from 'src/app/shared/interfaces/score';
import { isEvenDay } from 'src/app/shared/utils/selectors-utils/date-utils/is-even-day';
import { isInLastWeek } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-week';

export function isEvenDayInLastWeek(score: Score): boolean {
    return isEvenDay(score) && isInLastWeek(score);
}
