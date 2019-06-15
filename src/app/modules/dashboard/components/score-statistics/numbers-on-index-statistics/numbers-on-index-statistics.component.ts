import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DateScoreFilter } from 'src/app/shared/enums';
import { selectNumbersByFilter } from 'src/app/modules/dashboard/store/selectors';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';

@Component({
    selector: 'lm-numbers-on-index-statistics',
    templateUrl: './numbers-on-index-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersOnIndexStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public numberOnIndexFrequency$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public numberOnIndexByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    ngOnInit() {
        this.calculateNumberAdvicesForIndexes(0);
    }

    public numberOnIndexFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie ${this.dateRangeLabel(dateRange)}`;
    }

    public numberOnIndexFrequencyByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w dniu ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    public numberOnIndexInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    public numberOnIndexByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w dni nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w dni parzyste ${this.dateRangeLabel(dateRange)}`;

    }

    public numberOnIndexByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}`
            : `Częstotliwość losowania liczb na wybranym indeksie w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

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

    public numberOnIndexByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb na wybranym indeksie w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    public numberOnIndexByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w na wybranym indeksie w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    private calculateNumberAdvicesForIndexes(numberIndex: number): void {
        this.calculateNumberOnIndexFrequency(numberIndex);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex);
        this.calculateNumberOnIndexByOddOrEvenDay(numberIndex);

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateNumberOnIndexByOddOrEvenMonth(numberIndex);
            this.calculateNumberOnIndexByYearQuarter(numberIndex);
            this.calculateNumberOnIndexByMonthDayNumber(numberIndex);
        }

        if (this.isEntireRangeDateRange) {
            this.calculateNumberOnIndexInActualMonthName(numberIndex);
            this.calculateNumberOnIndexByYearDayNumber(numberIndex);
        }
    }

    private calculateNumberOnIndexFrequency(numberIndex: number): void {
        this.numberOnIndexFrequency$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange ]));
    }

    private calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex: number): void {
        this.numberOnIndexFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateNumberOnIndexInActualMonthName(numberIndex: number): void {
        this.numberOnIndexInActualMonthName$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateNumberOnIndexByOddOrEvenDay(numberIndex: number): void {
        this.numberOnIndexByOddOrEvenDay$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, this.oddOrEvenDayFilter ]));
    }

    private calculateNumberOnIndexByOddOrEvenMonth(numberIndex: number): void {
        this.numberOnIndexByOddOrEvenMonth$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateNumberOnIndexByYearQuarter(numberIndex: number): void {
        this.numberOnIndexByYearQuarter$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateNumberOnIndexByYearDayNumber(numberIndex: number): void {
        this.numberOnIndexByYearDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, DateScoreFilter.ENTIRE_RANGE, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateNumberOnIndexByMonthDayNumber(numberIndex: number): void {
        this.numberOnIndexByMonthDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ numberIndex, this.dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }

    public onNumberOnIndexFrequencyIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexFrequency(numberIndex);
    }

    public onNumberOnIndexFrequencyByDayOfTheWeekIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex);
    }

    public onNumberOnIndexInActualMonthNameIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexInActualMonthName(numberIndex);
    }

    public onNumberOnIndexByOddOrEvenDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByOddOrEvenDay(numberIndex);
    }

    public onNumberOnIndexByOddOrEvenMonthIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByOddOrEvenMonth(numberIndex);
    }

    public onNumberOnIndexByYearQuarterIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByYearQuarter(numberIndex);
    }

    public onNumberOnIndexByYearDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByYearDayNumber(numberIndex);
    }

    public onNumberOnIndexByMonthDayIndexChange(numberIndex: number): void {
        this.calculateNumberOnIndexByMonthDayNumber(numberIndex);
    }

}
