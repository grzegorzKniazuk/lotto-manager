import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from 'src/app/shared/interfaces/score';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScores, selectTotalScores } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { TableColumn } from 'src/app/shared/interfaces';
import { Table } from 'primeng/table';
import { TableFilterMatchModeEnum } from 'src/app/shared/enums';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-score-list',
    templateUrl: './score-list.component.html',
    styleUrls: [ './score-list.component.scss' ],
})
export class ScoreListComponent implements OnInit {

    @ViewChild('table', { static: true }) private table: Table;
    public readonly scoresList$: Observable<Score[]> = this.store.pipe(select(selectScores));
    public readonly totalScores$: Observable<number> = this.store.pipe(select(selectTotalScores));
    public readonly columns: TableColumn[] = this.columnArray;
    public dateRangeFilter: Date[];
    public readonly bonusNumbers: SelectItem[] = this.bonusNumbersArray;
    public readonly numbers: SelectItem[] = this.numbersArray;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.buildDataRangeFilter();
    }

    public rowTrackBy(score: Score): number {
        return score.id;
    }

    private get columnArray(): TableColumn[] {
        return [
            { field: 'id', header: 'Numer losowania', filterMatchMode: TableFilterMatchModeEnum.EQUALS },
            { field: 'date', header: 'Data losowania', filterMatchMode: TableFilterMatchModeEnum.DATA_RANGE_FILTER },
            { field: 'numbers', header: 'Wylosowane liczby', filterMatchMode: TableFilterMatchModeEnum.CONTAINS },
            { field: 'bonus_number', header: 'Liczba z plusem', filterMatchMode: TableFilterMatchModeEnum.EQUALS },
        ];
    }

    private get numbersArray(): SelectItem[] {
        const numbers: SelectItem[] = [];

        for (let i = 1; i <= 35; i++) {
            numbers.push({ label: `${i}`, value: `${i}` });
        }

        return numbers;
    }

    public get bonusNumbersArray(): SelectItem[] {
        return [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: 'Wszystkie', value: null },
        ];
    }

    private buildDataRangeFilter(): void {
        this.table.filterConstraints[TableFilterMatchModeEnum.DATA_RANGE_FILTER] = (value): boolean => {

            value = new Date(value);

            const startDate = this.dateRangeFilter[0].getTime();
            let endDate;

            if (this.dateRangeFilter[1]) {
                endDate = this.dateRangeFilter[1].getTime() + 86400000;
            } else {
                endDate = startDate + 86400000;
            }

            return value.getTime() >= startDate && value.getTime() <= endDate;
        };
    }
}
