import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { Score, ScoreQueryParams } from 'src/app/shared/interfaces';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {

    private readonly featureUrl = 'scores';

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    public loadScores(): Observable<Score[]> {
        return this.httpClient.get<Score[]>(`${API_URL}/${this.featureUrl}`);
    }

    public scoreNumbersByQueryParams<T>(scoreQueryParams: ScoreQueryParams): Observable<T> {
        return this.httpClient.post<T>(`${API_URL}/${this.featureUrl}/query`, scoreQueryParams).pipe(shareReplay());
    }
}
