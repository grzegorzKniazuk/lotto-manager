import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from 'src/app/shared/interfaces/score';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScores } from 'src/app/modules/dashboard/store/selectors/score.selectors';

@Component({
    selector: 'lm-score-list',
    templateUrl: './score-list.component.html',
    styleUrls: [ './score-list.component.scss' ],
})
export class ScoreListComponent implements OnInit {

    public readonly scoresList$: Observable<Score[]> = this.store.pipe(select(selectScores));

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {

    }

}
