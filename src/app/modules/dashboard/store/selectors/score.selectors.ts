import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { StoreFeatureNames } from 'src/app/shared/enums';

export const selectScoreState = createFeatureSelector<ScoreState>(StoreFeatureNames.SCORE);

export const selectScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectAll,
);

export const selectTotalScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectTotal,
);

export const selectIsScoresLoaded = createSelector(
    selectScoreState,
    (state: ScoreState) => state.isLoaded,
);
