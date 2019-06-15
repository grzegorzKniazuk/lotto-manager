import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { DateScoreFilter } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { selectNumbersByFilter } from 'src/app/modules/dashboard/store/selectors';
import { AppState } from 'src/app/store';

@Component({
    selector: 'lm-numbers-statistics',
    templateUrl: './numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public numbersFrequency$: Observable<NumberBallValuePercentage[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public numbersInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public numbersByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public numbersByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public numbersByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public numbersByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    ngOnInit() {
        this.calculateNumbersFrequency();
        this.calculateNumbersFrequencyByDayOfTheWeek();
        this.calculateNumbersByOddOrEvenDay();

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateNumbersByOddOrEvenMonth();
            this.calculateNumbersByYearQuarter();
            this.calculateNumbersByMonthDayNumber();
        }

        if (this.isEntireRangeDateRange) {
            this.calculateNumbersInActualMonthName();
            this.calculateNumbersByYearDayNumber();
        }
    }

    public numbersFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel(dateRange)}`;
    }

    public numbersFrequencyByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    public numbersInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    public numbersByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    public numbersByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

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

    public numbersByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    public numbersByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    private calculateNumbersFrequency(): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange ]));
    }

    private calculateNumbersFrequencyByDayOfTheWeek(): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateNumbersInActualMonthName(): void {
        this.numbersInActualMonthName$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateNumbersByOddOrEvenDay(): void {
        this.numbersByOddOrEvenDay$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, this.oddOrEvenDayFilter ]));
    }

    private calculateNumbersByOddOrEvenMonth(): void {
        this.numbersByOddOrEvenMonth$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateNumbersByYearQuarter(): void {
        this.numbersByYearQuarter$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateNumbersByYearDayNumber(): void {
        this.numbersByYearDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateNumbersByMonthDayNumber(): void {
        this.numbersByMonthDayNumber$ = this.store.pipe(select(selectNumbersByFilter, [ this.dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }
}
