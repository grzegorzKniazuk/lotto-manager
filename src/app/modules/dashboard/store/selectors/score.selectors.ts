import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { countBy, filter, flatten, pick } from 'lodash';
import { SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_NUMBERS_KEY } from 'src/app/shared/constants';
import {
    ballValuePercentageNumbersArrayWithExcludedNumber, isEvenDay, isEvenDayInLastMonth, isEvenDayInLastWeek, isEvenDayInLastYear, isEvenMonth, isEvenMonthInLastYear,
    isInLastMonth, isInLastWeek,
    isInLastYear, isOddDay, isOddDayInLastMonth, isOddDayInLastWeek, isOddDayInLastYear, isOddMonth, isOddMonthInLastYear, isSameMonthAsToday,
    isSameWeekDayAsToday,
    isSameWeekDayAsTodayInLastMonth,
    isSameWeekDayAsTodayInLastWeek,
    isSameWeekDayAsTodayInLastYear,
    mapNumbersArrayToBallValuePercentage, mapScoresToNumbersArray,
    mapValuesToBallValuePercentage, numbersArrayIncludesSpecificNumberAndDateRange, pickNumbers,
} from 'src/app/shared/utils';

export const selectScoreState = createFeatureSelector<ScoreState>(StoreFeatureNames.SCORE);

export const selectScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectAll,
);

export const selectTotalScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectTotal,
);

export const selectBonusNumbersScores = createSelector(
    selectScores,
    (scores: Score[]) => scores.map(score => pick(score, [ SCORES_DATE_KEY, SCORES_BONUS_NUMBER_KEY ])),
);

export const selectNumbersScores = createSelector(
    selectScores,
    (scores: Score[]) => scores.map(score => pick(score, [ SCORES_DATE_KEY, SCORES_NUMBERS_KEY ])),
);

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
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
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
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    },
);

export const selectMostPopularBonusNumberInActualMonthName = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>) => {
        const filteredScores = filter(scores, isSameMonthAsToday);

        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    }
);

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

export const selectNumberOnIndexFrequency = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredNumbers;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = flatten(scores.map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(isInLastYear).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(isInLastMonth).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(isInLastWeek).map(score => score.numbers[props.numberIndex]));
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
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsToday).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastYear).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastMonth).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(isSameWeekDayAsTodayInLastWeek).map(score => score.numbers[props.numberIndex]));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers);
    },
);

export const selectMostOftenFoundNumbersWithNumberOnIndex = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { ballNumber: number, dateRange: DateRange }) => {
        return ballValuePercentageNumbersArrayWithExcludedNumber(numbersArrayIncludesSpecificNumberAndDateRange(scores, props.ballNumber, props.dateRange))(props.ballNumber);
    },
);

export const selectMostPopularNumbersInActualMonthName = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>) => {
        return mapNumbersArrayToBallValuePercentage(mapScoresToNumbersArray(filter(scores, isSameMonthAsToday)));
    }
);

export const selectNumbersByOddDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDay));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastYear));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastMonth));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddDayInLastWeek));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    }
);

export const selectNumbersByEvenDay = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDay));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastYear));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastMonth));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenDayInLastWeek));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    }
);

export const selectNumbersByOddMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonth));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isOddMonthInLastYear));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    }
);

export const selectNumbersByEvenMonth = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonth));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = mapScoresToNumbersArray(filter(scores, isEvenMonthInLastYear));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredScores);
    }
);
