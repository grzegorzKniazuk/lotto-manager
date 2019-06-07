import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectMostPopularBonusNumberByDayOfTheWeek } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { AdviceType, DateRange } from 'src/app/shared/enums';
import { first } from 'rxjs/operators';
import { NumbersAnalyticsData } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
})
export class GeneratorAdvicesComponent implements OnInit {

    public readonly adviceTypes = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes = this.dateRangeSelectOptions;
    public adviceType: AdviceType = AdviceType.GENERAL;
    public dateRange: DateRange = DateRange.ENTIRE_RANGE;

    @Input()
    public set couponNumbers({ lotteryNumbers }: { lotteryNumbers: number[] }) {
        this.numbers = lotteryNumbers.slice(0, lotteryNumbers.length - 1);
        this.bonusNumber = lotteryNumbers[lotteryNumbers.length - 1];
    }

    private numbers: number[];
    private bonusNumber: number;

    constructor(
        private readonly store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.calculateGeneralAdvices(DateRange.ENTIRE_RANGE);
    }

    private get dateRangeSelectOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: DateRange.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateRange.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateRange.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateRange.LAST_WEEK },
        ];
    }

    private get adviceTypeSelectOptions(): SelectItem[] {
        return [
            { label: 'Ogólne', value: AdviceType.GENERAL },
            { label: 'Liczby 5-35', value: AdviceType.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceType.BONUS_NUMBER },
        ];
    }

    private onOptionClick(adviceType: AdviceType, dateRange: DateRange): void {
        switch (adviceType) {
            case AdviceType.GENERAL: {
                this.calculateGeneralAdvices(dateRange);
                break;
            }
            case AdviceType.NUMBERS: {

                break;
            }
            case AdviceType.BONUS_NUMBER: {

                break;
            }
        }
    }

    private calculateGeneralAdvices(dateRange): void {
        this.calculateBonusNumberAdvices(dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange);
    }

    private calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.store.pipe(
            select(selectMostPopularBonusNumberByDayOfTheWeek, { dateRange }),
            first(),
        ).subscribe((bonusNumbers: NumbersAnalyticsData) => {
            console.log(bonusNumbers);
        });
    }
}
