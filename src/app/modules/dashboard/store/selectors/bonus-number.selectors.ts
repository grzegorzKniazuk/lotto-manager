import { createSelector } from '@ngrx/store';
import { Score } from 'src/app/shared/interfaces/score';
import { DateRange } from 'src/app/shared/enums';
import {
    isEvenDay, isEvenDayInLastMonth, isEvenDayInLastWeek, isEvenDayInLastYear,
    isInLastMonth, isInLastWeek,
    isInLastYear, isOddDay, isOddDayInLastMonth, isOddDayInLastWeek, isOddDayInLastYear, isSameMonthAsToday,
    isSameWeekDayAsToday,
    isSameWeekDayAsTodayInLastMonth,
    isSameWeekDayAsTodayInLastWeek,
    isSameWeekDayAsTodayInLastYear,
    mapValuesToBallValuePercentage,
} from 'src/app/shared/utils';
import { SCORES_BONUS_NUMBER_KEY } from 'src/app/shared/constants';
import { selectBonusNumbersScores } from 'src/app/modules/dashboard/store/selectors/base-selectors';
import { filter, countBy } from 'lodash';

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
        console.log(filter(scores, isOddDay));
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    }
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
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY))(filteredScores.length);
    }
);
