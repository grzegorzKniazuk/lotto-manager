import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import * as moment from 'moment';

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
            if (moment(score.date).isSameOrAfter(props.dateRange[0]) && moment(score.date).isSameOrBefore(props.dateRange[1])) {
                return score.numbers;
            } else {
                return [];
            }
        } else if (props && props.dateRange && props.dateRange[0]) {
            if (moment(score.date).isSame(props.dateRange[0])) {
                return score.numbers;
            } else {
                return [];
            }
        } else {
            return score.numbers;
        }
    }),
);

export const selectScoresDates = createSelector(
    selectScores,
    (scores: Score[]) => scores.map((score: Score) => {
        return score.date;
    }),
);
