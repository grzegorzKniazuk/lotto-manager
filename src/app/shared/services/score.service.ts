import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { Score, ScoreQueryParams } from 'src/app/shared/interfaces';
import { shareReplay } from 'rxjs/operators';
import { ScoreNumbersExpression, ScoreNumbersFilters } from 'src/app/shared/enums';

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

    public scoreNumbersDateValueArray<T>(expression: ScoreNumbersExpression, scoreQueryParams: ScoreQueryParams): Observable<T> {
        return this.httpClient.post<T>(`${API_URL}/scores/${expression}`, scoreQueryParams).pipe(shareReplay());
    }

    public scoreNumbersBallValuePercentageArray<T>(filter: ScoreNumbersFilters, scoreQueryParams: ScoreQueryParams): Observable<T> {
        return this.httpClient.post<T>(`${API_URL}/scores/${filter}`, scoreQueryParams).pipe(shareReplay());
    }
}
