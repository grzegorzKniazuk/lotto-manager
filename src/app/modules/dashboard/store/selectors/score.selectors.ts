import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { countBy, filter, flatten, pick, map } from 'lodash';
import { SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_NUMBERS_KEY } from 'src/app/shared/constants';
import { mapNumbersArrayToBallValuePercentage, mapValuesToBallValuePercentage } from 'src/app/shared/utils';
import { TimeService } from 'src/app/shared/services/time.service';
import * as R from 'ramda';
import { NumberData } from 'src/app/shared/interfaces';

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
        return ballValuePercentageArrayWithExcludedNumber(numbersArrayIncludesSpecificNumberAndDateRange(scores, props.ballNumber, props.dateRange))(props.ballNumber);
    },
);

export const selectMostPopularNumbersInActualMonthName = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>) => {
        return mapNumbersArrayToBallValuePercentage(mapScoresToNumbersArray(filter(scores, isSameMonthAsToday)));
    }
);

function ballValuePercentageArrayWithExcludedNumber(numbers: number[]): (ballNumber: number) => NumberData[] {
    return function (ballNumber): NumberData[] {
        return R.compose(mapNumbersArrayToBallValuePercentage, excludeNumber)(numbers, ballNumber);
    };
}

function numbersArrayIncludesSpecificNumberAndDateRange(scores: Score[], ballNumber: number, dateRange: DateRange): number[] {
    return R.compose(mapScoresToNumbersArray, filterScoresBySelectedNumberAndDateRange)(scores, ballNumber, dateRange);
}

function excludeNumber(numbers: number[], excludeNumber: number): number[] {
    return numbers.filter(n => n !== excludeNumber);
}

function filterScoresBySelectedNumberAndDateRange(scores: Score[], ballNumber: number, dateRange: DateRange): Score[] {
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

function isInLastYear(score: Score): boolean {
    return TimeService.isSameOrAfter(score.date, TimeService.subtractYearFromNow);
}

function isInLastMonth(score: Score): boolean {
    return TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow);
}

function isInLastWeek(score: Score): boolean {
    return TimeService.isSameOrAfter(score.date, TimeService.subtractWeekFromNow);
}

function isSameMonthAsToday(score: Score): boolean {
    return TimeService.isSameMonthAsToday(score.date);
}

function isSameWeekDayAsToday(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date);
}

function isSameWeekDayAsTodayInLastYear(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date) && isInLastYear(score);
}

function isSameWeekDayAsTodayInLastMonth(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date) && isInLastMonth(score);
}

function isSameWeekDayAsTodayInLastWeek(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date) && isInLastWeek(score);
}

function pickNumbers(score: Score): number[] {
    return score.numbers;
}

function mapScoresToNumbersArray(scores: Score[]): number[] {
    return flatten(scores.map(score => score.numbers));
}

function isScoreNumbersIncludes(score: Score, searchNumber: number): boolean {
    return score.numbers.includes(searchNumber);
}
