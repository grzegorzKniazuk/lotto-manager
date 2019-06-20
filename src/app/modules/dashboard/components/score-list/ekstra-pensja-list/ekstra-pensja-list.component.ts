import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Score, TableColumn } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { selectScores, selectTotalScores } from 'src/app/modules/dashboard/store/selectors';
import { FIRST_DRAW_DATE, ONE_DAY_IN_MILLISECONDS, SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_ID_KEY, SCORES_NUMBERS_KEY } from 'src/app/shared/constants';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppState } from 'src/app/store';
import { TableFilterMatchModeEnum } from 'src/app/shared/enums';

@Component({
    selector: 'lm-ekstra-pensja-list',
    templateUrl: './ekstra-pensja-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EkstraPensjaListComponent implements OnInit {

    public readonly scoresList$: Observable<Score[]> = this.store.pipe(select(selectScores));
    public readonly totalScores$: Observable<number> = this.store.pipe(select(selectTotalScores));
    public readonly columns: TableColumn[] = this.columnArray;
    public dateRangeFilter: Date[] = [ new Date(FIRST_DRAW_DATE), new Date() ];
    public readonly bonusNumbers: SelectItem[] = this.bonusNumbersArray;
    public readonly numbers: SelectItem[] = this.numbersArray;
    @ViewChild('table', { static: true }) private table: Table;

    constructor(
        private readonly store: Store<AppState>,
    ) {
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

    private get columnArray(): TableColumn[] {
        return [
            { field: SCORES_ID_KEY, header: 'Numer losowania', filterMatchMode: TableFilterMatchModeEnum.EQUALS },
            { field: SCORES_DATE_KEY, header: 'Data losowania', filterMatchMode: TableFilterMatchModeEnum.DATA_RANGE_FILTER },
            { field: SCORES_NUMBERS_KEY, header: 'Wylosowane liczby', filterMatchMode: TableFilterMatchModeEnum.CONTAINS },
            { field: SCORES_BONUS_NUMBER_KEY, header: 'Liczba z plusem', filterMatchMode: TableFilterMatchModeEnum.EQUALS },
        ];
    }

    private get numbersArray(): SelectItem[] {
        const numbers: SelectItem[] = [];

        for (let i = 1; i <= 35; i++) {
            numbers.push({ label: `${i}`, value: `${i}` });
        }

        return numbers;
    }

    ngOnInit() {
        this.buildDataRangeFilter();
    }

    public rowTrackBy(score: Score): number {
        return score.id;
    }

    private buildDataRangeFilter(): void {
        this.table.filterConstraints[TableFilterMatchModeEnum.DATA_RANGE_FILTER] = (value): boolean => {

            value = new Date(value);

            const startDate = this.dateRangeFilter[0].getTime();
            let endDate;

            if (this.dateRangeFilter[1]) {
                endDate = this.dateRangeFilter[1].getTime() + ONE_DAY_IN_MILLISECONDS;
            } else {
                endDate = startDate + ONE_DAY_IN_MILLISECONDS;
            }

            return value.getTime() >= startDate && value.getTime() <= endDate;
        };
    }
}
