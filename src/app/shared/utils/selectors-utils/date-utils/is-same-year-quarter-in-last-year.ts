import { Score } from 'src/app/shared/interfaces/score';
import { isSameYearQuarter } from 'src/app/shared/utils/selectors-utils/date-utils/is-same-year-quarter';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';

export function isSameYearQuarterInLastYear(score: Score): boolean {
    return isSameYearQuarter(score) && isInLastYear(score);
}
