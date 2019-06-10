import { createSelector } from '@ngrx/store';
import { selectNumbersScores } from 'src/app/modules/dashboard/store/selectors/base-selectors';
import { Score } from 'src/app/shared/interfaces/score';
import { DateRange } from 'src/app/shared/enums';
import {
    isEvenDay,
    isEvenDayInLastMonth,
    isEvenDayInLastWeek,
    isEvenDayInLastYear, isEvenMonth, isEvenMonthInLastYear,
    isInLastMonth,
    isInLastWeek,
    isInLastYear,
    isOddDay,
    isOddDayInLastMonth,
    isOddDayInLastWeek,
    isOddDayInLastYear,
    isOddMonth, isOddMonthInLastYear,
    isSameMonthAsToday,
    isSameMonthAsTodayInLastYear, isSameMonthDayNumber, isSameMonthDayNumberInLastYear,
    isSameWeekDayAsToday,
    isSameWeekDayAsTodayInLastMonth,
    isSameWeekDayAsTodayInLastWeek,
    isSameWeekDayAsTodayInLastYear, isSameYearDayNumber, isSameYearQuarter, isSameYearQuarterInLastYear,
    mapNumbersArrayToBallValuePercentage,
    mapScoresToNumbersArray,
} from 'src/app/shared/utils';
import { filter } from 'lodash';

export const selectNumberOnIndexFrequency = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredNumbers;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = mapScoresToNumbersArray(scores)(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isInLastYear))(props.numberIndex);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isInLastMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isInLastWeek))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectNumberOnIndexFrequencyByDayOfTheWeek = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredNumbers;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameWeekDayAsToday))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameWeekDayAsTodayInLastYear))(props.numberIndex);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameWeekDayAsTodayInLastMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameWeekDayAsTodayInLastWeek))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectNumberOnIndexInActualMonthName = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredNumbers;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameMonthAsToday))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = mapScoresToNumbersArray(filter(scores, isSameMonthAsTodayInLastYear))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectNumberOnIndexByOddDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDay))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastYear))(props.numberIndex);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastWeek))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByEvenDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDay))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastYear))(props.numberIndex);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastWeek))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByOddMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonthInLastYear))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByEvenMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonth))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonthInLastYear))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByYearQuarter = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearQuarter))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearQuarterInLastYear))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByYearDayNumber = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearDayNumber))(props.numberIndex);

        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumberOnIndexByMonthDayNumber = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameMonthDayNumber))(props.numberIndex);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameMonthDayNumberInLastYear))(props.numberIndex);
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);
