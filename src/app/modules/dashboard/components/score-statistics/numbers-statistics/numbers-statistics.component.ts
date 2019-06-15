import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
export class NumbersStatisticsComponent extends BaseStatisticsComponent {

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

    @Input()
    public set dateRange(dateRange: DateScoreFilter) {
        this.calculate(dateRange);
    }

    public get numbersFrequencyLabel(): string {
        return `Częstotliwość losowania wszystkich liczb`;
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

    private calculate(dateRange) {
        this.calculateNumbersFrequency(dateRange);
        this.calculateNumbersFrequencyByDayOfTheWeek(dateRange);
        this.calculateNumbersByOddOrEvenDay(dateRange);
        this.calculateNumbersByOddOrEvenMonth(dateRange);
        this.calculateNumbersByYearQuarter(dateRange);
        this.calculateNumbersByMonthDayNumber(dateRange);
        this.calculateNumbersInActualMonthName(dateRange);
        this.calculateNumbersByYearDayNumber(dateRange);
    }

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
}
