import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, ScoresFilters, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { countBy, mapValues, pick, flatten } from 'lodash';
import { NumberData } from 'src/app/shared/interfaces';
import { SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_NUMBERS_KEY, scoresFilters } from 'src/app/shared/constants';

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
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY]);
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_YEAR]);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_MONTH]);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_WEEK]);
                break;
            }
        }

        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY), filteredScores.length).sort(sortDescending);
    },
);

export const selectBonusNumberFrequency = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredScores;

        switch (props.dateRange) {
            case DateRange.LAST_YEAR: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_YEAR]);
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_MONTH]);
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredScores = scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_WEEK]);
                break;
            }
            default: {
                filteredScores = scores;
            }
        }
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY), filteredScores.length).sort(sortDescending);
    },
);

export const selectNumbersFrequency = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredNumbers;
        switch (props.dateRange) {
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_YEAR]).map(score => score.numbers));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_MONTH]).map(score => score.numbers));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_WEEK]).map(score => score.numbers));
                break;
            }
            default: {
                filteredNumbers = flatten(scores.map(score => score.numbers));
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers).sort(sortDescending);
    },
);

function mapNumbersArrayToBallValuePercentage(array: number[]): NumberData[] {
    const result = {};

    array.forEach(number => {
        if (result.hasOwnProperty(number)) {
            result[number] = result[number] + 1;
        } else {
            Object.defineProperty(result, number, { value: 1, writable: true, configurable: true, enumerable: true });
        }
    });
    return mapValuesToBallValuePercentage(result, array.length);
}

function mapValuesToBallValuePercentage(values: { [key: string]: number }, total: number): NumberData[] {
    const resultArray = [];

    mapValues(values, (value, index) => {
        resultArray.push({
            ball: +index,
            value,
            percentage: percentage(value, total),
        });
    });

    return resultArray;
}

function percentage(value: number, total: number): number {
    return (value / total) * 100;
}

function sortDescending(a, b): number {
    return b.value - a.value;
}


