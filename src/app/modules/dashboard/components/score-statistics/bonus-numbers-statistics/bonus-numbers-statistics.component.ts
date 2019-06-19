import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { DateScoreFilter } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { selectBonusNumberByFilter } from 'src/app/modules/dashboard/store/selectors';
import { AppState } from 'src/app/store';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { DateRangeFilterWithBallIndexesArray } from 'src/app/shared/types';
import { DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY } from 'src/app/shared/constants';

@Component({
    selector: 'lm-bonus-numbers-statistics',
    templateUrl: './bonus-numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonusNumbersStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public bonusNumberFrequency$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByDayOfTheWeek$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberInActualMonthName$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByOddOrEvenDay$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByOddOrEvenMonth$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByYearQuarter$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByYearDayNumber$: Observable<NumberBallValuePercentage[]>;
    public bonusNumberByMonthDayNumber$: Observable<NumberBallValuePercentage[]>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    public get bonusNumberByDayOfTheWeekLabel(): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName}`;
    }

    public get bonusNumberInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName}`;
    }

    public get bonusNumberByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste` : `Częstotliwość losowania liczby bonusowej w dni parzyste`;
    }

    public get bonusNumberByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste`;
    }

    public get bonusNumberByYearQuarterLabel(): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczby bonusowej w pierwszym kwartale roku`;
            }
            case 2: {
                return `Częstotliwość losowania liczby bonusowej w drugim kwartale roku`;
            }
            case 3: {
                return `Częstotliwość losowania liczby bonusowej w trzecim kwartale roku`;
            }
            case 4: {
                return `Częstotliwość losowania liczby bonusowej w czwartym kwartale roku`;
            }
        }
    }

    public get bonusNumberByYearDayNumberLabel(): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku`;
    }

    public get bonusNumberByMonthDayNumberLabel(): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca`;
    }

    public ngOnInit(): void {
        this.calculate();
    }

    public calculateBonusNumberFrequency([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange ]));
    }

    public calculateBonusNumbersByDayOfTheWeek([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    public calculateBonusNumberInActualMonthName([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    public calculateBonusNumberByOddOrEvenDay([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByOddOrEvenDay$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, this.oddOrEvenDayFilter ]));
    }

    public calculateBonusNumberByOddOrEvenMonth([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByOddOrEvenMonth$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, this.oddOrEvenMonthFilter ]));
    }

    public calculateBonusNumberByYearQuarter([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByYearQuarter$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    public calculateBonusNumberByYearDayNumber([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByYearDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    public calculateBonusNumberByMonthDayNumber([ dateRange ]: DateRangeFilterWithBallIndexesArray): void {
        this.bonusNumberByMonthDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }

    private calculate(): void {
        this.calculateBonusNumberFrequency(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateBonusNumbersByDayOfTheWeek(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateBonusNumberByOddOrEvenDay(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);

        this.calculateBonusNumberByOddOrEvenMonth(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateBonusNumberByYearQuarter(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateBonusNumberByMonthDayNumber(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);

        this.calculateBonusNumberByYearDayNumber(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateBonusNumberInActualMonthName(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
    }

}
