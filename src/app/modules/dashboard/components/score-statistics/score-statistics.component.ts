import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberData } from 'src/app/shared/interfaces';
import { TimeService } from 'src/app/shared/services/time.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import {
    selectBonusNumberByDayOfTheWeek,
    selectBonusNumberByEvenDay,
    selectBonusNumberByEvenMonth,
    selectBonusNumberByMonthDayNumber,
    selectBonusNumberByOddDay,
    selectBonusNumberByOddMonth,
    selectBonusNumberByYearDayNumber,
    selectBonusNumberByYearQuarter,
    selectBonusNumberFrequency,
    selectBonusNumberInActualMonthName,
    selectNumberOnIndexByEvenDay,
    selectNumberOnIndexByEvenMonth,
    selectNumberOnIndexByMonthDayNumber,
    selectNumberOnIndexByOddDay,
    selectNumberOnIndexByOddMonth,
    selectNumberOnIndexByYearDayNumber,
    selectNumberOnIndexByYearQuarter,
    selectNumberOnIndexFrequency,
    selectNumberOnIndexFrequencyByDayOfTheWeek,
    selectNumberOnIndexInActualMonthName,
    selectNumbersByEvenDay,
    selectNumbersByEvenMonth,
    selectNumbersByMonthDayNumber,
    selectNumbersByOddDay,
    selectNumbersByOddMonth,
    selectNumbersByYearDayNumber,
    selectNumbersByYearQuarter,
    selectNumbersFrequency,
    selectNumbersFrequencyByDayOfTheWeek,
    selectNumbersInActualMonthName,
} from 'src/app/modules/dashboard/store/selectors';
import { SelectItem } from 'primeng/api';
import { Memoize } from 'lodash-decorators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'lm-score-statistics',
    templateUrl: './score-statistics.component.html',
    styleUrls: [ './score-statistics.component.scss' ],
})
export class ScoreStatisticsComponent implements OnInit, OnDestroy {
    /* numbers */
    public numbersFrequency$: Observable<NumberData[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numbersInActualMonthName$: Observable<NumberData[]>;
    public numbersByOddOrEvenDay$: Observable<NumberData[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberData[]>;
    public numbersByYearQuarter$: Observable<NumberData[]>;
    public numbersByYearDayNumber$: Observable<NumberData[]>;
    public numbersByMonthDayNumber$: Observable<NumberData[]>;

    /* numbers by indexes */
    public numberOnIndexFrequency$: Observable<NumberData[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numberOnIndexInActualMonthName$: Observable<NumberData[]>;
    public numberOnIndexByOddOrEvenDay$: Observable<NumberData[]>;
    public numberOnIndexByOddOrEvenMonth$: Observable<NumberData[]>;
    public numberOnIndexByYearQuarter$: Observable<NumberData[]>;
    public numberOnIndexByYearDayNumber$: Observable<NumberData[]>;
    public numberOnIndexByMonthDayNumber$: Observable<NumberData[]>;

    /* bonus numbers */
    public bonusNumberFrequency$: Observable<NumberData[]>;
    public bonusNumberByDayOfTheWeek$: Observable<NumberData[]>;
    public bonusNumberInActualMonthName$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenDay$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenMonth$: Observable<NumberData[]>;
    public bonusNumberByYearQuarter$: Observable<NumberData[]>;
    public bonusNumberByYearDayNumber$: Observable<NumberData[]>;
    public bonusNumberByMonthDayNumber$: Observable<NumberData[]>;

    /* others */
    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    private readonly todayDayName: string = this.timeService.todayDayName;
    private readonly todayMonthName: string = this.timeService.todayMonthName;
    private readonly todayYearDayNumber: number = this.timeService.todayYearDayNumber;
    private readonly todayMonthDayNumber: number = this.timeService.todayMonthDayNumber;

    constructor(
        private readonly timeService: TimeService,
        private readonly store: Store<AppState>,
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

    @Memoize
    public isEntireRange(dateRange: DateRange): boolean {
        return dateRange === DateRange.ENTIRE_RANGE;
    }

    @Memoize
    public isLastYearRange(dateRange: DateRange): boolean {
        return dateRange === DateRange.LAST_YEAR;
    }

    @Memoize
    private dateRangeLabel(dateRange: DateRange): string {
        switch (dateRange) {
            case DateRange.ENTIRE_RANGE: {
                return 'dla wszystkich losowań';
            }
            case DateRange.LAST_YEAR: {
                return 'dla losowań z ostatniego roku';
            }
            case DateRange.LAST_MONTH: {
                return 'dla losowań z ostatniego miesiąca';
            }
            case DateRange.LAST_WEEK: {
                return 'dla losowań z ostatniego tygodnia';
            }
        }
    }

    /* numbers labels */
    @Memoize
    public numbersFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersFrequencyByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenDayLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenMonthLabel(dateRange: DateRange): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByYearQuarterLabel(dateRange: DateRange): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb w pierwszym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 2: {
                return `Częstotliwość losowania liczb w drugim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 3: {
                return `Częstotliwość losowania liczb w trzecim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 4: {
                return `Częstotliwość losowania liczb w czwartym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
        }
    }

    @Memoize
    public numbersByYearDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByMonthDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    /* numbers by indexes labels */
    @Memoize
    public numberOnIndexFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb na wybranym indeksie ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexFrequencyByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `'Częstotliwość losowania liczb na wybranym indeksie w dniu ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByOddOrEvenDayLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w dni nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w dni parzyste ${this.dateRangeLabel(dateRange)}`;

    }

    @Memoize
    public numberOnIndexByOddOrEvenMonthLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByYearQuarterLabel(dateRange: DateRange): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb na wybranym indeksie w pierwszym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 2: {
                return `Częstotliwość losowania liczb na wybranym indeksie w drugim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 3: {
                return `Częstotliwość losowania liczb na wybranym indeksie w trzecim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 4: {
                return `Częstotliwość losowania liczb na wybranym indeksie w czwartym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
        }
    }

    @Memoize
    public numberOnIndexByYearDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb na wybranym indeksie w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByMonthDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb w na wybranym indeksie w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    /* bonus number labels */
    @Memoize
    public bonusNumberFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenDayLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenMonthLabel(dateRange: DateRange): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByYearQuarterLabel(dateRange: DateRange): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczby bonusowej w pierwszym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 2: {
                return `Częstotliwość losowania liczby bonusowej w drugim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 3: {
                return `Częstotliwość losowania liczby bonusowej w trzecim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 4: {
                return `Częstotliwość losowania liczby bonusowej w czwartym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
        }
    }

    @Memoize
    public bonusNumberByYearDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByMonthDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
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
        /* numbers */
        this.calculateNumbersFrequency(dateRange);
        this.calculateNumbersFrequencyByDayOfTheWeek(dateRange);
        this.calculateNumbersInActualMonthName(dateRange);
        this.calculateNumbersByOddOrEvenDay(dateRange);
        this.calculateNumbersByOddOrEvenMonth(dateRange);
        this.calculateNumbersByYearQuarter(dateRange);
        this.calculateNumbersByYearDayNumber(dateRange);
        this.calculateNumbersByMonthDayNumber(dateRange);

        this.calculateNumberAdvicesForIndexes(0, dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateBonusNumberInActualMonthName(dateRange);
        this.calculateBonusNumberByOddOrEvenDay(dateRange);
        this.calculateBonusNumberByOddOrEvenMonth(dateRange);
        this.calculateBonusNumberByYearQuarter(dateRange);
        this.calculateBonusNumberByYearDayNumber(dateRange);
        this.calculateBonusNumberByMonthDayNumber(dateRange);
    }

    private calculateNumberAdvicesForIndexes(numberIndex: number, dateRange: DateRange): void {
        /* numbers indexes */
        this.calculateNumberOnIndexFrequency(numberIndex, dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex, dateRange);
        this.calculateNumberOnIndexInActualMonthName(numberIndex, dateRange);
        this.calculateNumberOnIndexByOddOrEvenDay(numberIndex, dateRange);
        this.calculateNumberOnIndexByOddOrEvenMonth(numberIndex, dateRange);
        this.calculateNumberOnIndexByYearQuarter(numberIndex, dateRange);
        this.calculateNumberOnIndexByYearDayNumber(numberIndex, dateRange);
        this.calculateNumberOnIndexByMonthDayNumber(numberIndex, dateRange);
    }

    /* numbers */
    @Memoize
    private calculateNumbersFrequency(dateRange: DateRange): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersFrequency, { dateRange }));
    }

    @Memoize
    private calculateNumbersFrequencyByDayOfTheWeek(dateRange: DateRange): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange }));
    }

    @Memoize
    private calculateNumbersInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersInActualMonthName$ = this.store.pipe(select(selectNumbersInActualMonthName, { dateRange }));
        }
    }

    @Memoize
    private calculateNumbersByOddOrEvenDay(dateRange: DateRange): void {
        this.numbersByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectNumbersByOddDay, { dateRange }))
            : this.store.pipe(select(selectNumbersByEvenDay, { dateRange }));
    }

    @Memoize
    private calculateNumbersByOddOrEvenMonth(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByOddOrEvenMonth$ = this.timeService.isOddMonthToday
                ? this.store.pipe(select(selectNumbersByOddMonth, { dateRange }))
                : this.store.pipe(select(selectNumbersByEvenMonth, { dateRange }));
        }
    }

    @Memoize
    private calculateNumbersByYearQuarter(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByYearQuarter$ = this.store.pipe(select(selectNumbersByYearQuarter, { dateRange }));
        }
    }

    @Memoize
    private calculateNumbersByYearDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByYearDayNumber$ = this.store.pipe(select(selectNumbersByYearDayNumber));
        }
    }

    @Memoize
    private calculateNumbersByMonthDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByMonthDayNumber$ = this.store.pipe(select(selectNumbersByMonthDayNumber, { dateRange }));
        }
    }

    /* numbers by indexes */
    private calculateNumberOnIndexFrequency(numberIndex: number, dateRange: DateRange): void {
        this.numberOnIndexFrequency$ = this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex, dateRange }));
    }

    private calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex: number, dateRange: DateRange): void {
        this.numberOnIndexFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex, dateRange }));
    }

    private calculateNumberOnIndexInActualMonthName(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexInActualMonthName$ = this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByOddOrEvenDay(numberIndex: number, dateRange: DateRange): void {
        this.numberOnIndexByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex, dateRange }))
            : this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex, dateRange }));
    }

    private calculateNumberOnIndexByOddOrEvenMonth(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByOddOrEvenMonth$ = this.timeService.isOddDayToday
                ? this.store.pipe(select(selectNumberOnIndexByOddMonth, { numberIndex, dateRange }))
                : this.store.pipe(select(selectNumberOnIndexByEvenMonth, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByYearQuarter(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByYearQuarter$ = this.store.pipe(select(selectNumberOnIndexByYearQuarter, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByYearDayNumber(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByYearDayNumber$ = this.store.pipe(select(selectNumberOnIndexByYearDayNumber, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByMonthDayNumber(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByMonthDayNumber$ = this.store.pipe(select(selectNumberOnIndexByMonthDayNumber, { numberIndex, dateRange }));
        }
    }

    /* number by indexes - indexes changes */
    public onNumberOnIndexFrequencyIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexFrequency(numberIndex, this.dateRange);
    }

    public onNumberOnIndexFrequencyByDayOfTheWeekIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex, this.dateRange);
    }

    public onNumberOnIndexInActualMonthNameIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexInActualMonthName(numberIndex, this.dateRange);
    }

    public onNumberOnIndexByOddOrEvenDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByOddOrEvenDay(numberIndex, this.dateRange);
    }

    public onNumberOnIndexByOddOrEvenMonthIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByOddOrEvenMonth(numberIndex, this.dateRange);
    }

    public onNumberOnIndexByYearQuarterIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByYearQuarter(numberIndex, this.dateRange);
    }

    public onNumberOnIndexByYearDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByYearDayNumber(numberIndex, this.dateRange);
    }

    public onNumberOnIndexByMonthDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByMonthDayNumber(numberIndex, this.dateRange);
    }

    /* bonus number */
    private calculateBonusNumberFrequency(dateRange: DateRange): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberFrequency, { dateRange }));
    }

    private calculateBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange }));
    }

    private calculateBonusNumberInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberInActualMonthName));
        }
    }

    private calculateBonusNumberByOddOrEvenDay(dateRange: DateRange): void {
        this.bonusNumberByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectBonusNumberByOddDay, { dateRange }))
            : this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange }));
    }

    private calculateBonusNumberByOddOrEvenMonth(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberByOddOrEvenMonth$ = this.timeService.isOddMonthToday
                ? this.store.pipe(select(selectBonusNumberByOddMonth, { dateRange }))
                : this.store.pipe(select(selectBonusNumberByEvenMonth, { dateRange }));
        }
    }

    private calculateBonusNumberByYearQuarter(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberByYearQuarter$ = this.store.pipe(select(selectBonusNumberByYearQuarter, { dateRange }));
        }
    }

    private calculateBonusNumberByYearDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberByYearDayNumber$ = this.store.pipe(select(selectBonusNumberByYearDayNumber));
        }
    }

    private calculateBonusNumberByMonthDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberByMonthDayNumber$ = this.store.pipe(select(selectBonusNumberByMonthDayNumber, { dateRange }));
        }
    }
}
