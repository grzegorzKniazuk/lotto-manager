import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Score } from 'src/app/shared/interfaces/score';
import { ScoreActions, ScoreActionsTypes } from 'src/app/modules/dashboard/store/actions/score.actions';

export interface ScoreState extends EntityState<Score> {
    isLoaded: boolean;
}

export const scoreAdapter: EntityAdapter<Score> = createEntityAdapter<Score>();

export const initialScoreState: ScoreState = scoreAdapter.getInitialState({
    isLoaded: false,
});

export function scoreReducer(state = initialScoreState, action: ScoreActions): ScoreState {
    switch (action.type) {
        case ScoreActionsTypes.SET_SCORES: {
            return scoreAdapter.addMany(action.payload.scores, {
                ...state,
                isLoaded: true,
            });
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = scoreAdapter.getSelectors();
