import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectNumbersRangeOnIndex } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { DateRange } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-generator-tips',
    templateUrl: './generator-tips.component.html',
    styleUrls: [ './generator-tips.component.scss' ],
})
export class GeneratorTipsComponent implements OnInit, OnDestroy {

    @Input()
    public set index(index: number) {
        this.ballIndex = index;

        this.calculateNumbersRangeOnIndex(index, this.numbersRangeOnIndexSelectButtonFormControl.value || DateRange.ENTIRE_RANGE);
    };
    private ballIndex: number;
    public numbersRangeOnIndexSelectButtonOptions: SelectItem[] = this.buildDateRangeSelectButtonOptions;
    public selectButtonsForm: FormGroup = this.buildFom;
    public numbersRangeOnIndex: [ number, number ];

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private timeService: TimeService,
    ) {
    }

    public ngOnInit(): void {
        this.watchFormControls();
    }

    public ngOnDestroy(): void {
    }

    private watchFormControls(): void {
        merge(
            this.numbersRangeOnIndexSelectButtonFormControl.valueChanges,
        ).subscribe((
            dateRangeForNumbersRangeOnIndex,
        ) => {
            this.calculateNumbersRangeOnIndex(this.ballIndex, dateRangeForNumbersRangeOnIndex);
        });
    }

    private get numbersRangeOnIndexSelectButtonFormControl(): AbstractControl {
        return this.selectButtonsForm.controls['numbersRangeOnIndexSelectButton'];
    }

    private get buildFom(): FormGroup {
        return this.formBuilder.group({
            numbersRangeOnIndexSelectButton: [ DateRange.ENTIRE_RANGE ],
        });
    }

    private calculateNumbersRangeOnIndex(index, dateRange = DateRange.ENTIRE_RANGE): void {
        this.store.pipe(
            select(selectNumbersRangeOnIndex, { index, dateRange }),
            first(),
        ).subscribe((numbersRangeOnIndex: [ number, number ]) => {
            this.numbersRangeOnIndex = numbersRangeOnIndex;
        });
    }

    private get buildDateRangeSelectButtonOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: DateRange.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateRange.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateRange.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateRange.LAST_WEEK },
        ];
    }
}
