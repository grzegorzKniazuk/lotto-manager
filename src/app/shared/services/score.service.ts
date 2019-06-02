import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { API_URL } from 'src/app/shared/constants';
import { SET_SCORES } from 'src/app/modules/dashboard/store/actions/score.actions';
import { Score } from 'src/app/shared/interfaces/score';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly store: Store<AppState>
    ) {
    }

    public loadScores(): void {
        this.httpClient.get(`${API_URL}/scores`).subscribe((scores: Score[]) => {
            this.store.dispatch(new SET_SCORES({ scores }))
        });
    }
}
