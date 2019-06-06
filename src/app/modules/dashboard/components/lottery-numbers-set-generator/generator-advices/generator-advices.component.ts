import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, zip } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectMostPopularBonusNumberByDayOfTheWeek } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { AdviceType, DateRange } from 'src/app/shared/enums';
import { first, startWith } from 'rxjs/operators';
import { NumbersAnalyticsData, SelectButtonConfig } from 'src/app/shared/interfaces';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
})
export class GeneratorAdvicesComponent implements OnInit, OnDestroy {

    @Input()
    public set couponNumbers({ lotteryNumbers }: { lotteryNumbers: number[] }) {
        this.numbers = lotteryNumbers.slice(0, lotteryNumbers.length - 1);
        this.bonusNumber = lotteryNumbers[lotteryNumbers.length - 1];
    }

    private numbers: number[];
    private bonusNumber: number;

    public readonly dateRangeForm: FormGroup = this.buildDateRangeForm;
    public readonly adviceTypeForm: FormGroup = this.buildAdviceTypeForm;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.watchOnFormSelectChanges();
    }

    ngOnDestroy() {
    }

    private get buildDateRangeForm(): FormGroup {
        return this.formBuilder.group({
            dateRange: [ DateRange.ENTIRE_RANGE ],
        });
    }

    private get buildAdviceTypeForm(): FormGroup {
        return this.formBuilder.group({
            adviceType: [ AdviceType.GENERAL ],
        });
    }

    private get dateRangeControl(): AbstractControl {
        return this.dateRangeForm.controls['dateRange'];
    }

    private get adviceTypeControl(): AbstractControl {
        return this.adviceTypeForm.controls['adviceType'];
    }

    private watchOnFormSelectChanges(): void {
        merge(
            this.dateRangeControl.valueChanges,
            this.adviceTypeControl.valueChanges,
        ).pipe(
            startWith([ DateRange.ENTIRE_RANGE, AdviceType.GENERAL ]),
        ).subscribe((([ dateRange, adviceType ]: [ DateRange, AdviceType ]) => {
            console.log(dateRange);
            console.log(adviceType);

            switch (adviceType) {
                case AdviceType.GENERAL: {
                    this.calculateMostPopularNumbersByDayOfTheWeek(dateRange);
                    break;
                }
                case AdviceType.NUMBERS: {

                    break;
                }
                case AdviceType.BONUS_NUMBER: {

                }
            }
        }));
    }

    private calculateMostPopularNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.store.pipe(
            select(selectMostPopularBonusNumberByDayOfTheWeek, { dateRange }),
            first(),
        ).subscribe((bonusNumbers: NumbersAnalyticsData) => {
            console.log(bonusNumbers);
        });
    }

    public get dateRangeSelectOptions(): SelectButtonConfig[] {
        return [
            { label: 'Wszystkie losowania', value: DateRange.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateRange.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateRange.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateRange.LAST_WEEK },
        ];
    }

    public get adviceTypeSelectOptions(): SelectButtonConfig[] {
        return [
            { label: 'Ogólne', value: AdviceType.GENERAL },
            { label: 'Liczby 5-35', value: AdviceType.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceType.BONUS_NUMBER },
        ];
    }
}
