import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { NumberData } from 'src/app/shared/interfaces';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TimeService } from 'src/app/shared/services/time.service';
import {
    selectBonusNumberFrequency, selectMostOftenFoundNumbersWithNumberOnIndex,
    selectMostPopularBonusNumberByDayOfTheWeek,
    selectNumberOnIndexFrequency, selectNumberOnIndexFrequencyByDayOfTheWeek,
    selectNumbersFrequency, selectNumbersFrequencyByDayOfTheWeek,
} from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { LOTTERY_NUMBERS_ARRAY_LENGTH } from 'src/app/shared/constants';
import { last } from 'lodash';

@AutoUnsubscribe()
@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
})
export class GeneratorAdvicesComponent implements OnInit, OnDestroy {

    public readonly adviceTypes = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes = this.dateRangeSelectOptions;
    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    public todayDayName: string = this.timeService.todayDayName;

    @Input()
    public set couponNumbers({ lotteryNumbers }: { lotteryNumbers: number[] }) {
        this.numbers = lotteryNumbers.slice(0, lotteryNumbers.length - 1);
        this.bonusNumber = lotteryNumbers[lotteryNumbers.length - 1];

        this.calculateNumberOnIndexFrequency(this.numbers.length, this.dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, this.dateRange);
        this.calculateMostOftenFoundNumbersWithNumberOnIndex(last(this.numbers), this.dateRange);
    }

    private numbers: number[];
    private bonusNumber: number;

    public mostPopularBonusNumbersByDayOfTheWeek$: Observable<NumberData[]>;
    public bonusNumberFrequency$: Observable<NumberData[]>;
    public numbersFrequency$: Observable<NumberData[]>;
    public numberOnIndexFrequency$: Observable<NumberData[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public mostOftenFoundNumbersWithNumberOnIndex$: Observable<NumberData[]>;

    constructor(
        private readonly store: Store<AppState>,
        private readonly timeService: TimeService,
    ) {
    }

    ngOnInit() {
        this.calculateGeneralAdvices(DateRange.ENTIRE_RANGE);
    }

    ngOnDestroy() {
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
            { label: 'Ogólne', value: AdviceTypeEnum.GENERAL },
            { label: 'Liczby 5-35', value: AdviceTypeEnum.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceTypeEnum.BONUS_NUMBER },
        ];
    }

    private onOptionClick(adviceType: AdviceTypeEnum, dateRange: DateRange): void {
        switch (adviceType) {
            case AdviceTypeEnum.GENERAL: {
                this.calculateGeneralAdvices(dateRange);
                break;
            }
            case AdviceTypeEnum.NUMBERS: {
                this.calculateNumbersAdvices(dateRange);
                break;
            }
            case AdviceTypeEnum.BONUS_NUMBER: {
                this.calculateBonusNumberAdvices(dateRange);
                break;
            }
        }
    }

    private calculateGeneralAdvices(dateRange: DateRange): void {
    }

    private calculateNumbersAdvices(dateRange: DateRange): void {
        this.calculateNumbersFrequency(dateRange);
        this.calculateNumbersFrequencyByDayOfTheWeek(dateRange);
        this.calculateNumberOnIndexFrequency(this.numbers.length, dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, dateRange);
        this.calculateMostOftenFoundNumbersWithNumberOnIndex(last(this.numbers), dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateBonusNumberFrequency(dateRange);
    }

    /* numbers */
    private calculateNumbersFrequency(dateRange: DateRange): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersFrequency, { dateRange }));
    }

    private calculateNumbersFrequencyByDayOfTheWeek(dateRange: DateRange): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange }));
    }

    private calculateNumberOnIndexFrequency(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.numberOnIndexFrequency$ = this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.numberOnIndexFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex, dateRange }));
        }
    }

    private calculateMostOftenFoundNumbersWithNumberOnIndex(ballNumber: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.mostOftenFoundNumbersWithNumberOnIndex$ = this.store.pipe(select(selectMostOftenFoundNumbersWithNumberOnIndex, { ballNumber, dateRange }));
        }
    }

    /* bonus number */
    private calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.mostPopularBonusNumbersByDayOfTheWeek$ = this.store.pipe(select(selectMostPopularBonusNumberByDayOfTheWeek, { dateRange }));
    }

    private calculateBonusNumberFrequency(dateRange: DateRange): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberFrequency, { dateRange }));
    }
}
