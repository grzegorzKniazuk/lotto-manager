import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, ScoresFilters, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { countBy, pick, flatten } from 'lodash';
import { SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_NUMBERS_KEY, scoresFilters } from 'src/app/shared/constants';
import { mapNumbersArrayToBallValuePercentage, mapValuesToBallValuePercentage, sortValueDescending } from 'src/app/shared/utils';

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

        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY), filteredScores.length).sort(sortValueDescending);
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
        }
        return mapValuesToBallValuePercentage(countBy(filteredScores, SCORES_BONUS_NUMBER_KEY), filteredScores.length).sort(sortValueDescending);
    },
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
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers).sort(sortValueDescending);
    },
);

export const selectNumbersFrequencyByDayOfTheWeek = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { dateRange: DateRange }) => {
        let filteredNumbers;
        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY]).map(score => score.numbers));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_YEAR]).map(score => score.numbers));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_MONTH]).map(score => score.numbers));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_WEEK]).map(score => score.numbers));
                break;
            }
        }
        return mapNumbersArrayToBallValuePercentage(filteredNumbers).sort(sortValueDescending);
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
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_YEAR]).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_MONTH]).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_IN_LAST_WEEK]).map(score => score.numbers[props.numberIndex]));
                break;
            }
        }

        return mapNumbersArrayToBallValuePercentage(filteredNumbers).sort(sortValueDescending);
    }
);

export const selectNumberOnIndexFrequencyByDayOfTheWeek = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { numberIndex: number, dateRange: DateRange }) => {
        let filteredNumbers;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY]).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_YEAR: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_YEAR]).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_MONTH: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_MONTH]).map(score => score.numbers[props.numberIndex]));
                break;
            }
            case DateRange.LAST_WEEK: {
                filteredNumbers = flatten(scores.filter(scoresFilters[ScoresFilters.IS_SAME_WEEK_DAY_AS_TODAY_IN_LAST_WEEK]).map(score => score.numbers[props.numberIndex]));
                break;
            }
        }

        return mapNumbersArrayToBallValuePercentage(filteredNumbers).sort(sortValueDescending);
    }
);

