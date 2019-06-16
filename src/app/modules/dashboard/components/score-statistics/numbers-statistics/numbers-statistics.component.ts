import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { DateScoreFilter } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { selectNumbersByFilter } from 'src/app/modules/dashboard/store/selectors';
import { AppState } from 'src/app/store';
import { DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY } from 'src/app/shared/constants';
import { DateRangeFilterWithBallIndexesArray } from 'src/app/shared/types';

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

    public ngOnInit(): void {
        this.calculate();
    }

    public get numbersFrequencyByDayOfTheWeekLabel(): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName}`;
    }

    public get numbersInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName}`;
    }

    public get numbersByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste` : `Częstotliwość losowania liczb w dni parzyste`;
    }

    public get numbersByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste` : `Częstotliwość losowania liczb w miesiące parzyste`;
    }

    public get numbersByYearQuarterLabel(): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb w pierwszym kwartale roku`;
            }
            case 2: {
                return `Częstotliwość losowania liczb w drugim kwartale roku`;
            }
            case 3: {
                return `Częstotliwość losowania liczb w trzecim kwartale roku`;
            }
            case 4: {
                return `Częstotliwość losowania liczb w czwartym kwartale roku`;
            }
        }
    }

    public get numbersByYearDayNumberLabel(): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku`;
    }

    public get numbersByMonthDayNumberLabel(): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca`;
    }

    private calculate() {
        this.calculateNumbersFrequency(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersFrequencyByDayOfTheWeek(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersByOddOrEvenDay(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersByOddOrEvenMonth(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersByYearQuarter(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersByMonthDayNumber(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersInActualMonthName(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateNumbersByYearDayNumber(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
    }

    public calculateNumbersFrequency([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange ], indexes: ballIndexes }));
    }

    public calculateNumbersFrequencyByDayOfTheWeek([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ], indexes: ballIndexes }));
    }

    public calculateNumbersInActualMonthName([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersInActualMonthName$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ], indexes: ballIndexes }));
    }

    public calculateNumbersByOddOrEvenDay([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersByOddOrEvenDay$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, this.oddOrEvenDayFilter ], indexes: ballIndexes }));
    }

    public calculateNumbersByOddOrEvenMonth([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersByOddOrEvenMonth$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, this.oddOrEvenMonthFilter ], indexes: ballIndexes }));
    }

    public calculateNumbersByYearQuarter([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersByYearQuarter$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, DateScoreFilter.SAME_YEAR_QUARTER ], indexes: ballIndexes }));
    }

    public calculateNumbersByYearDayNumber([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersByYearDayNumber$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ], indexes: ballIndexes }));
    }

    public calculateNumbersByMonthDayNumber([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.numbersByMonthDayNumber$ = this.store.pipe(select(selectNumbersByFilter, { filters: [ dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ], indexes: ballIndexes }));
    }
}
