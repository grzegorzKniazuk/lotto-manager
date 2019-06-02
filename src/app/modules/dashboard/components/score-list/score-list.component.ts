import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from 'src/app/shared/interfaces/score';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScores } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { TableColumn } from 'src/app/shared/interfaces';

@Component({
    selector: 'lm-score-list',
    templateUrl: './score-list.component.html',
    styleUrls: [ './score-list.component.scss' ],
})
export class ScoreListComponent implements OnInit {

    public readonly scoresList$: Observable<Score[]> = this.store.pipe(select(selectScores));
    public readonly columns: TableColumn[] = this.columnArray;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
    }

    public rowTrackBy(score: Score): number {
        return score.id;
    }

    private get columnArray(): TableColumn[] {
        return [
            { field: 'id', header: 'Numer losowania' },
            { field: 'date', header: 'Data losowania' },
            { field: 'numbers', header: 'Wylosowane liczby' },
            { field: 'bonus_number', header: 'Liczba z plusem' },
        ];
    }
}
