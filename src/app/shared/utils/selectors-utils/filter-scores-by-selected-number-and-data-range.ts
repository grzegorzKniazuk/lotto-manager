import { Score } from 'src/app/shared/interfaces/score';
import { DateRange } from 'src/app/shared/enums';
import { filter } from 'lodash';
import { isScoreNumbersIncludes } from 'src/app/shared/utils/selectors-utils/is-score-numbers-includes';
import { isInLastMonth } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-month';
import { isInLastYear } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-year';
import { isInLastWeek } from 'src/app/shared/utils/selectors-utils/date-utils/is-in-last-week';

export function filterScoresBySelectedNumberAndDateRange(scores: Score[], ballNumber: number, dateRange: DateRange): Score[] {
    switch (dateRange) {
        case DateRange.ENTIRE_RANGE: {
            return filter(scores, score => isScoreNumbersIncludes(score, ballNumber));
        }
        case DateRange.LAST_YEAR: {
            return filter(scores, score => isScoreNumbersIncludes(score, ballNumber) && isInLastYear(score));
        }
        case DateRange.LAST_MONTH: {
            return filter(scores, score => isScoreNumbersIncludes(score, ballNumber) && isInLastMonth(score));
        }
        case DateRange.LAST_WEEK: {
            return filter(scores, score => isScoreNumbersIncludes(score, ballNumber) && isInLastWeek(score));
        }
    }
}
