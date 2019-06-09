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
    selectBonusNumberByEvenDay, selectBonusNumberByEvenMonth,
    selectBonusNumberByOddDay, selectBonusNumberByOddMonth,
    selectBonusNumberFrequency,
    selectMostOftenFoundNumbersWithNumberOnIndex,
    selectMostPopularBonusNumberByDayOfTheWeek,
    selectMostPopularBonusNumberInActualMonthName,
    selectMostPopularNumbersInActualMonthName,
    selectNumberOnIndexFrequency,
    selectNumberOnIndexFrequencyByDayOfTheWeek,
    selectNumbersByEvenDay, selectNumbersByEvenMonth,
    selectNumbersByOddDay, selectNumbersByOddMonth,
    selectNumbersFrequency,
    selectNumbersFrequencyByDayOfTheWeek,
} from 'src/app/modules/dashboard/store/selectors';
import { LOTTERY_NUMBERS_ARRAY_LENGTH } from 'src/app/shared/constants';
import { last } from 'lodash';

@AutoUnsubscribe()
@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
})
export class GeneratorAdvicesComponent implements OnInit, OnDestroy {

    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;
    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    public todayDayName: string = this.timeService.todayDayName;
    public todayMonthName: string = this.timeService.todayMonthName;

    /* numbers */
    public numbersFrequency$: Observable<NumberData[]>;
    public numberOnIndexFrequency$: Observable<NumberData[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public mostOftenFoundNumbersWithNumberOnIndex$: Observable<NumberData[]>;
    public mostPopularNumbersInActualMonthName$: Observable<NumberData[]>;
    public numbersByOddOrEvenDay$: Observable<NumberData[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberData[]>;

    /* bonus numbers */
    public bonusNumberFrequency$: Observable<NumberData[]>;
    public mostPopularBonusNumberByDayOfTheWeek$: Observable<NumberData[]>;
    public mostPopularBonusNumberInActualMonthName$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenDay$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenMonth$: Observable<NumberData[]>;

    private numbers: number[];
    private bonusNumber: number;

    constructor(
        private readonly store: Store<AppState>,
        private readonly timeService: TimeService,
    ) {
    }

    @Input()
    public set couponNumbers({ lotteryNumbers }: { lotteryNumbers: number[] }) {
        this.numbers = lotteryNumbers.slice(0, lotteryNumbers.length - 1);
        this.bonusNumber = lotteryNumbers[lotteryNumbers.length - 1];

        this.calculateNumberOnIndexFrequency(this.numbers.length, this.dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, this.dateRange);
        this.calculateMostOftenFoundNumbersWithNumberOnIndex(last(this.numbers), this.dateRange);
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

    ngOnInit() {
        this.calculateGeneralAdvices(DateRange.ENTIRE_RANGE);
    }

    ngOnDestroy() {
    }

    public get isEntireRange(): boolean {
        return this.dateRange === DateRange.ENTIRE_RANGE;
    }

    public get isLastYearRange(): boolean {
        return this.dateRange === DateRange.LAST_YEAR;
    }

    public get numbersByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? 'Częstotliwość losowania liczb w dni nieparzyste' : 'Częstotliwość losowania liczb w dni parzyste';
    }

    public get numbersByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? 'Częstotliwość losowania liczb w miesiące nieparzyste' : 'Częstotliwość losowania liczb w miesiące parzyste';
    }

    public get bonusNumberByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? 'Częstotliwość losowania liczby bonusowej w dni nieparzyste' : 'Częstotliwość losowania liczby bonusowej w dni parzyste';
    }

    public get bonusNumberByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? 'Częstotliwość losowania liczby bonusowej w miesiące nieparzyste' : 'Częstotliwość losowania liczby bonusowej w miesiące parzyste';
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
        this.calculateMostPopularNumbersInActualMonthName();
        this.calculateNumbersByOddOrEvenDay(dateRange);
        this.calculateNumbersByOddOrEvenMonth(dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateMostPopularBonusNumberInActualMonthName();
        this.calculateBonusNumberByOddOrEvenDay(dateRange);
        this.calculateBonusNumberByOddOrEvenMonth(dateRange);
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

    private calculateMostPopularNumbersInActualMonthName(): void {
        if (this.isEntireRange) {
            this.mostPopularNumbersInActualMonthName$ = this.store.pipe(select(selectMostPopularNumbersInActualMonthName));
        }
    }

    private calculateNumbersByOddOrEvenDay(dateRange: DateRange): void {
        this.numbersByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectNumbersByOddDay, { dateRange }))
            : this.store.pipe(select(selectNumbersByEvenDay, { dateRange }));
    }

    private calculateNumbersByOddOrEvenMonth(dateRange: DateRange): void {
        if (this.isEntireRange || this.isLastYearRange) {
            this.numbersByOddOrEvenMonth$ = this.timeService.isOddMonthToday
                ? this.store.pipe(select(selectNumbersByOddMonth, { dateRange }))
                : this.store.pipe(select(selectNumbersByEvenMonth, { dateRange }));
        }
    }

    /* bonus number */
    private calculateBonusNumberFrequency(dateRange: DateRange): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberFrequency, { dateRange }));
    }

    private calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.mostPopularBonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectMostPopularBonusNumberByDayOfTheWeek, { dateRange }));
    }

    private calculateMostPopularBonusNumberInActualMonthName(): void {
        if (this.isEntireRange) {
            this.mostPopularBonusNumberInActualMonthName$ = this.store.pipe(select(selectMostPopularBonusNumberInActualMonthName));
        }
    }

    private calculateBonusNumberByOddOrEvenDay(dateRange: DateRange): void {
        this.bonusNumberByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectBonusNumberByOddDay, { dateRange }))
            : this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange }));
    }

    private calculateBonusNumberByOddOrEvenMonth(dateRange: DateRange): void {
        if (this.isEntireRange || this.isLastYearRange) {
            this.bonusNumberByOddOrEvenMonth$ = this.timeService.isOddMonthToday
                ? this.store.pipe(select(selectBonusNumberByOddMonth, { dateRange }))
                : this.store.pipe(select(selectBonusNumberByEvenMonth, { dateRange }));
        }
    }
}
