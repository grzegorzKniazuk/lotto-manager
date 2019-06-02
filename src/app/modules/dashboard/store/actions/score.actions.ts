import { Action } from '@ngrx/store';
import { Score } from 'src/app/shared/interfaces/score';

export enum ScoreActionsTypes {
    SET_SCORES = '[Score] Set Scores',
}

export class SET_SCORES implements Action {
    public readonly type = ScoreActionsTypes.SET_SCORES;

    constructor(public payload: { scores: Score[] }) {
    }
}

export type ScoreActions = SET_SCORES;

