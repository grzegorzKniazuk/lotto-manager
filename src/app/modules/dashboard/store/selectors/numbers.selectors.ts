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
    isSameMonthAsToday, isSameMonthAsTodayInLastYear, isSameMonthDayNumber, isSameMonthDayNumberInLastYear,
    isSameWeekDayAsToday,
    isSameWeekDayAsTodayInLastMonth,
    isSameWeekDayAsTodayInLastWeek,
    isSameWeekDayAsTodayInLastYear,
    isSameYearDayNumber,
    isSameYearQuarter,
    isSameYearQuarterInLastYear,
    mapNumbersArrayToBallValuePercentage,
    mapScoresToNumbersArray,
    pickNumbers,
} from 'src/app/shared/utils';
import { selectNumbersScores } from 'src/app/modules/dashboard/store/selectors/base-selectors';
import { filter, flatten } from 'lodash';

export const selectNumbersFrequency = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredNumbers;
        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = flatten(scores.map(score => score.numbers));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(isInLastYear).map(pickNumbers));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(isInLastMonth).map(pickNumbers));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(isInLastWeek).map(pickNumbers));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectNumbersFrequencyByDayOfTheWeek = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredNumbers;
        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsToday).map(pickNumbers));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastYear).map(pickNumbers));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastMonth).map(pickNumbers));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastWeek).map(pickNumbers));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectNumbersInActualMonthName = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores = mapScoresToNumbersArray(filter(scores, isSameMonthAsToday))();

        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByOddDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDay))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastYear))();
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastMonth))();
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastWeek))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByEvenDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDay))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastYear))();
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastMonth))();
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastWeek))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByOddMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonth))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonthInLastYear))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByEvenMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonth))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonthInLastYear))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByYearQuarter = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearQuarter))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearQuarterInLastYear))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByYearDayNumber = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>) => {
        let filteredScores = mapScoresToNumbersArray(filter(scores, isSameYearDayNumber))();

        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);

export const selectNumbersByMonthDayNumber = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameMonthDayNumber))();
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isSameMonthDayNumberInLastYear))();
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    },
);
