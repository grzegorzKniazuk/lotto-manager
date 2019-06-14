import { DateScoreFilter } from 'src/app/shared/enums';
import {
    isEvenDay,
    isEvenMonth,
    isInLastMonth,
    isInLastWeek,
    isInLastYear,
    isOddDay,
    isOddMonth,
    isSameMonthAsToday, isSameMonthDayNumber,
    isSameWeekDayAsToday,
    isSameYearDayNumber,
    isSameYearQuarter,
} from 'src/app/shared/utils/selectors-utils/date-utils';
import { filterScoresNumbersArrayByIndex } from 'src/app/shared/utils';
import { Score } from 'src/app/shared/interfaces/score';

export const ScoreFilterMap = {
    // filtry indeksow
    /*
    0: (score: Score) => filterScoresNumbersArrayByIndex(score, 0),
    1: (score: Score) => filterScoresNumbersArrayByIndex(score, 1),
    2: (score: Score) => filterScoresNumbersArrayByIndex(score, 2),
    3: (score: Score) => filterScoresNumbersArrayByIndex(score, 3),
    4: (score: Score) => filterScoresNumbersArrayByIndex(score, 4),
*/
    // filtry dat
    [DateScoreFilter.ENTIRE_RANGE]: () => true,
    [DateScoreFilter.LAST_YEAR]: isInLastYear,
    [DateScoreFilter.LAST_WEEK]: isInLastWeek,
    [DateScoreFilter.LAST_MONTH]: isInLastMonth,
    [DateScoreFilter.SAME_WEEK_DAY_AS_TODAY]: isSameWeekDayAsToday,
    [DateScoreFilter.SAME_MONTH_AS_TODAY]: isSameMonthAsToday,
    [DateScoreFilter.ODD_DAY]: isOddDay,
    [DateScoreFilter.EVEN_DAY]: isEvenDay,
    [DateScoreFilter.ODD_MONTH]: isOddMonth,
    [DateScoreFilter.EVEN_MONTH]: isEvenMonth,
    [DateScoreFilter.SAME_YEAR_DAY_NUMBER]: isSameYearDayNumber,
    [DateScoreFilter.SAME_YEAR_QUARTER]: isSameYearQuarter,
    [DateScoreFilter.SAME_MONTH_DAY_NUMBER]: isSameMonthDayNumber,
};
