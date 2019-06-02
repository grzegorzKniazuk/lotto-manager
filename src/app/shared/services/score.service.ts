import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Score } from 'src/app/shared/interfaces/score';
import { Observable } from 'rxjs';

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
}
