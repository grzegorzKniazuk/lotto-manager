import { createSelector } from '@ngrx/store';
import { Score } from 'src/app/shared/interfaces/score';
import { DateRange } from 'src/app/shared/enums';
import {
    isEvenDay,
    isEvenDayInLastMonth,
    isEvenDayInLastWeek,
    isEvenDayInLastYear,
    isEvenMonth,
    isEvenMonthInLastYear,
    isInLastMonth,
    isInLastWeek,
    isInLastYear,
    isOddDay,
    isOddDayInLastMonth,
    isOddDayInLastWeek,
    isOddDayInLastYear,
    isOddMonth,
    isOddMonthInLastYear,
    isSameMonthAsToday,
    isSameWeekDayAsToday,
    isSameWeekDayAsTodayInLastMonth,
    isSameWeekDayAsTodayInLastWeek,
    isSameWeekDayAsTodayInLastYear, isSameYearQuarter, isSameYearQuarterInLastYear,
    mapBonusNumbersCountedToBallValuePercentage,
} from 'src/app/shared/utils';
import { SCORES_BONUS_NUMBER_KEY } from 'src/app/shared/constants';
import { selectBonusNumbersScores } from 'src/app/modules/dashboard/store/selectors/base-selectors';
import { countBy, filter } from 'lodash';

export const selectMostPopularBonusNumberByDayOfTheWeek = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isSameWeekDayAsToday);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isSameWeekDayAsTodayInLastYear);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = filter(scores, isSameWeekDayAsTodayInLastMonth);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = filter(scores, isSameWeekDayAsTodayInLastWeek);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberFrequency = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = scores;
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isInLastYear);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = filter(scores, isInLastMonth);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = filter(scores, isInLastWeek);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectMostPopularBonusNumberInActualMonthName = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>) => {
        const filteredScores = filter(scores, isSameMonthAsToday);

        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberByOddDay = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isOddDay);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isOddDayInLastYear);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = filter(scores, isOddDayInLastMonth);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = filter(scores, isOddDayInLastWeek);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberByEvenDay = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isEvenDay);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isEvenDayInLastYear);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = filter(scores, isEvenDayInLastMonth);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = filter(scores, isEvenDayInLastWeek);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberByOddMonth = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isOddMonth);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isOddMonthInLastYear);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberByEvenMonth = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isEvenMonth);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isEvenMonthInLastYear);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectBonusNumberByYearQuarter = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = filter(scores, isSameYearQuarter);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = filter(scores, isSameYearQuarterInLastYear);
                break;
            }
        }
        return mapBonusNumbersCountedToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);
