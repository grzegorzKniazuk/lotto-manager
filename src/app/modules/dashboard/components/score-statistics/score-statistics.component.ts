import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { TimeService } from 'src/app/shared/services/time.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdviceTypeEnum, DateScoreFilter } from 'src/app/shared/enums';
import { selectBonusNumberByFilter, selectNumbersByFilter } from 'src/app/modules/dashboard/store/selectors';
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
    public numbersFrequency$: Observable<NumberBallValuePercentage[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public numbersInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public numbersByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public numbersByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public numbersByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public numbersByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    /* numbers by indexes */
    public numberOnIndexFrequency$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    /* bonus numbers */
    public bonusNumberFrequency$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    /* others */
    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateScoreFilter = DateScoreFilter.ENTIRE_RANGE;
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
        this.calculateGeneralAdvices(DateScoreFilter.ENTIRE_RANGE);
    }

    ngOnDestroy() {
    }

    private get dateRangeSelectOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: DateScoreFilter.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateScoreFilter.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateScoreFilter.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateScoreFilter.LAST_WEEK },
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
    private dateRangeLabel(dateRange: DateScoreFilter): string {
        switch (dateRange) {
            case DateScoreFilter.ENTIRE_RANGE: {
                return 'dla wszystkich losowań';
            }
            case DateScoreFilter.LAST_YEAR: {
                return 'dla losowań z ostatniego roku';
            }
            case DateScoreFilter.LAST_MONTH: {
                return 'dla losowań z ostatniego miesiąca';
            }
            case DateScoreFilter.LAST_WEEK: {
                return 'dla losowań z ostatniego tygodnia';
            }
        }
    }

    /* numbers labels */
    @Memoize
    public numbersFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersFrequencyByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByYearQuarterLabel(dateRange: DateScoreFilter): string {
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
    public numbersByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    /* numbers by indexes labels */
    @Memoize
    public numberOnIndexFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexFrequencyByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w dniu ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w dni nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w dni parzyste ${this.dateRangeLabel(dateRange)}`;

    }

    @Memoize
    public numberOnIndexByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByYearQuarterLabel(dateRange: DateScoreFilter): string {
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
    public numberOnIndexByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb na wybranym indeksie w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w na wybranym indeksie w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    /* bonus number labels */
    @Memoize
    public bonusNumberFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByYearQuarterLabel(dateRange: DateScoreFilter): string {
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
    public bonusNumberByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    private onOptionClick(adviceType: AdviceTypeEnum, dateRange: DateScoreFilter): void {
        this.adviceType = adviceType;
        this.dateRange = dateRange;

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

    private calculateGeneralAdvices(dateRange: DateScoreFilter): void {
    }

    private calculateNumbersAdvices(dateRange: DateScoreFilter): void {
        this.calculateNumbersFrequency(dateRange);
        this.calculateNumbersFrequencyByDayOfTheWeek(dateRange);
        this.calculateNumbersByOddOrEvenDay(dateRange);

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateNumbersByOddOrEvenMonth(dateRange);
            this.calculateNumbersByYearQuarter(dateRange);
            this.calculateNumbersByMonthDayNumber(dateRange);
        }

        if (this.isEntireRangeDateRange) {
            this.calculateNumbersInActualMonthName(dateRange);
            this.calculateNumbersByYearDayNumber(dateRange);
        }

        this.calculateNumberAdvicesForIndexes(0, dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateScoreFilter): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateBonusNumberByOddOrEvenDay(dateRange);

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateBonusNumberByOddOrEvenMonth(dateRange);
            this.calculateBonusNumberByYearQuarter(dateRange);
            this.calculateBonusNumberByMonthDayNumber(dateRange);
        }

        if (this.isEntireRangeDateRange) {
            this.calculateBonusNumberByYearDayNumber(dateRange);
            this.calculateBonusNumberInActualMonthName(dateRange);
        }
    }

    private calculateNumberAdvicesForIndexes(numberIndex: number, dateRange: DateScoreFilter): void {
        this.calculateNumberOnIndexFrequency(numberIndex, dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex, dateRange);
        this.calculateNumberOnIndexByOddOrEvenDay(numberIndex, dateRange);

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateNumberOnIndexByOddOrEvenMonth(numberIndex, dateRange);
            this.calculateNumberOnIndexByYearQuarter(numberIndex, dateRange);
            this.calculateNumberOnIndexByMonthDayNumber(numberIndex, dateRange);
        }

        if (this.isEntireRangeDateRange) {
            this.calculateNumberOnIndexInActualMonthName(numberIndex, dateRange);
            this.calculateNumberOnIndexByYearDayNumber(numberIndex);
        }
    }

    /* numbers */
    private calculateNumbersFrequency(dateRange: DateScoreFilter): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange ]));
    }

    private calculateNumbersFrequencyByDayOfTheWeek(dateRange: DateScoreFilter): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateNumbersInActualMonthName(dateRange: DateScoreFilter): void {
        this.numbersInActualMonthName$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateNumbersByOddOrEvenDay(dateRange: DateScoreFilter): void {
        this.numbersByOddOrEvenDay$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, this.oddOrEvenDayFilter ]));
    }

    private calculateNumbersByOddOrEvenMonth(dateRange: DateScoreFilter): void {
        this.numbersByOddOrEvenMonth$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateNumbersByYearQuarter(dateRange: DateScoreFilter): void {
        this.numbersByYearQuarter$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateNumbersByYearDayNumber(dateRange: DateScoreFilter): void {
        this.numbersByYearDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateNumbersByMonthDayNumber(dateRange: DateScoreFilter): void {
        this.numbersByMonthDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }

    /* numbers by indexes */
    private calculateNumberOnIndexFrequency(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexFrequency$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange ]));
    }

    private calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateNumberOnIndexInActualMonthName(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexInActualMonthName$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateNumberOnIndexByOddOrEvenDay(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexByOddOrEvenDay$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, this.oddOrEvenDayFilter ]));
    }

    private calculateNumberOnIndexByOddOrEvenMonth(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexByOddOrEvenMonth$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateNumberOnIndexByYearQuarter(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexByYearQuarter$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateNumberOnIndexByYearDayNumber(numberIndex: number): void {
        this.numberOnIndexByYearDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, DateScoreFilter.ENTIRE_RANGE, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateNumberOnIndexByMonthDayNumber(numberIndex: number, dateRange: DateScoreFilter): void {
        this.numberOnIndexByMonthDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
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
        this.calculateNumberOnIndexByYearDayNumber(numberIndex);
    }

    public onNumberOnIndexByMonthDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByMonthDayNumber(numberIndex, this.dateRange);
    }

    /* bonus number */
    private calculateBonusNumberFrequency(dateRange: DateScoreFilter): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange ]));
    }

    private calculateBonusNumbersByDayOfTheWeek(dateRange: DateScoreFilter): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateBonusNumberInActualMonthName(dateRange: DateScoreFilter): void {
        this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberByFilter, [dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateBonusNumberByOddOrEvenDay(dateRange: DateScoreFilter): void {
        this.bonusNumberByOddOrEvenDay$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, this.oddOrEvenDayFilter ]))
    }

    private calculateBonusNumberByOddOrEvenMonth(dateRange: DateScoreFilter): void {
        this.bonusNumberByOddOrEvenMonth$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateBonusNumberByYearQuarter(dateRange: DateScoreFilter): void {
        this.bonusNumberByYearQuarter$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateBonusNumberByYearDayNumber(dateRange: DateScoreFilter): void {
        this.bonusNumberByYearDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateBonusNumberByMonthDayNumber(dateRange: DateScoreFilter): void {
        this.bonusNumberByMonthDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }

    public get isEntireRangeDateRange(): boolean {
        return this.dateRange === DateScoreFilter.ENTIRE_RANGE;
    }

    public get isLastYearRangeDateRange(): boolean {
        return this.dateRange === DateScoreFilter.LAST_YEAR;
    }

    private get oddOrEvenDayFilter(): DateScoreFilter {
        return this.timeService.isOddDayToday ? DateScoreFilter.ODD_DAY : DateScoreFilter.EVEN_DAY;
    }

    private get oddOrEvenMonthFilter(): DateScoreFilter {
        return this.timeService.isOddMonthToday ? DateScoreFilter.ODD_MONTH : DateScoreFilter.EVEN_MONTH;
    }
}
