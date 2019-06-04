import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export const selectScoreState = createFeatureSelector<ScoreState>(StoreFeatureNames.SCORE);

export const selectScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectAll,
);

export const selectTotalScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectTotal,
);

export const selectScoresNumbersByDateRange = createSelector(
    selectScores,
    (scores: Score[], props: { dateRange: string[] }) => scores.map((score: Score) => {
        if (props && props.dateRange && props.dateRange[0] && props.dateRange[1]) {
            if (TimeService.isSameOrAfter(score.date, props.dateRange[0]) && TimeService.isSameOrBefore(score.date, props.dateRange[1])) {
                return score.numbers;
            } else {
                return [];
            }
        } else if (props && props.dateRange && props.dateRange[0]) {
            if (TimeService.isSame(score.date, props.dateRange[0])) {
                return score.numbers;
            } else {
                return [];
            }
        } else {
            return score.numbers;
        }
    }),
);

export const selectNumbersRangeOnIndex = createSelector(
    selectScores,
    (scores: Score[], props: { index: number, dateRange: DateRange }) => {
        const numbersOnIndex = [];

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                numbersOnIndex.push(...scores.map((score: Score) => score.numbers[props.index]));
                break;
            }
            case DateRange.LAST_YEAR: {
                numbersOnIndex.push(
                    ...scores
                    .filter((score: Score) => TimeService.isSameOrAfter(score.date, TimeService.subtractYearFromNow))
                    .map((score: Score) => score.numbers[props.index]),
                );
                break;
            }
            case DateRange.LAST_MONTH: {
                numbersOnIndex.push(
                    ...scores
                    .filter((score: Score) => TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow))
                    .map((score: Score) => score.numbers[props.index]),
                );
                break;
            }
            case DateRange.LAST_WEEK: {
                numbersOnIndex.push(
                    ...scores
                    .filter((score: Score) => TimeService.isSameOrAfter(score.date, TimeService.subtractWeekFromNow))
                    .map((score: Score) => score.numbers[props.index]),
                );
                break;
            }
        }
        return [ Math.min(...numbersOnIndex), Math.max(...numbersOnIndex) ];
    },
);
