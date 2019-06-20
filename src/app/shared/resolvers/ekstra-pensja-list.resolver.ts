import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Score } from 'src/app/shared/interfaces/score';
import { Observable } from 'rxjs';
import { ScoreService } from 'src/app/shared/services';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { switchMap, takeWhile, tap } from 'rxjs/operators';
import { SET_SCORES } from 'src/app/modules/dashboard/store/actions/score.actions';
import { Injectable } from '@angular/core';
import { selectIsScoresLoaded } from 'src/app/modules/dashboard/store/selectors';

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
        return this.store.pipe(
            select(selectIsScoresLoaded),
            tap((isLoaded: boolean) => {
                console.log(isLoaded);
            }),
            takeWhile((isLoaded: boolean) => !isLoaded),
            switchMap(() => this.scoreService.ekstraPensjaScores()),
            tap((scores: Score[]) => {
                this.store.dispatch(new SET_SCORES({ scores }));
            }),
        );
    }
}
