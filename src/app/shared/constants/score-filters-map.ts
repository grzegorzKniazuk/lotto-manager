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

export const ScoreFilterMap = {
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
