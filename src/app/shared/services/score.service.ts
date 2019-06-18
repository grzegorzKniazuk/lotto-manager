import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, SCORE_QUERY_PARAMS_EXPRESSION_KEY } from 'src/app/shared/constants';
import { Score } from 'src/app/shared/interfaces/score';
import { Observable } from 'rxjs';
import { ScoreQueryParams } from '../interfaces';
import { omit } from 'lodash';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    public loadScores(): Observable<Score[]> {
        return this.httpClient.get<Score[]>(`${API_URL}/scores`);
    }

    public scoreNumbersDateValueArray(scoreQueryParams: ScoreQueryParams): Observable<[ string, number ][]> {
        return this.httpClient.post<[ string, number ][]>(`${API_URL}/scores/${scoreQueryParams.expression}`, omit(scoreQueryParams, SCORE_QUERY_PARAMS_EXPRESSION_KEY)).pipe(shareReplay());
    }
}
