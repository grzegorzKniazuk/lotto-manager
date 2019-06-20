import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Score } from 'src/app/shared/interfaces/score';
import { Observable } from 'rxjs';
import { ScoreService } from 'src/app/shared/services';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { tap } from 'rxjs/operators';
import { SET_SCORES } from 'src/app/modules/dashboard/store/actions/score.actions';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EkstraPensjaListResolver implements Resolve<Score[]> {

    constructor(
        private readonly scoreService: ScoreService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Score[]> | Promise<Score[]> | Score[] {
        return this.scoreService.ekstraPensjaScores().pipe(
            tap((scores: Score[]) => {
                this.store.dispatch(new SET_SCORES({ scores }));
            }),
        );
    }

}
