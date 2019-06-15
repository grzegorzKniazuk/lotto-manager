import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { DateScoreFilter } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { selectBonusNumberByFilter } from 'src/app/modules/dashboard/store/selectors';
import { AppState } from 'src/app/store';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-bonus-numbers-statistics',
    templateUrl: './bonus-numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonusNumbersStatisticsComponent extends BaseStatisticsComponent {

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

    @Input()
    public set dateRange(dateRange: DateScoreFilter) {
        this.calculate(dateRange);
    }

    public get bonusNumberFrequencyLabel(): string {
        return `Częstotliwość losowania liczb bonusowych`;
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

    private calculate(dateRange: DateScoreFilter): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateBonusNumberByOddOrEvenDay(dateRange);

        this.calculateBonusNumberByOddOrEvenMonth(dateRange);
        this.calculateBonusNumberByYearQuarter(dateRange);
        this.calculateBonusNumberByMonthDayNumber(dateRange);

        this.calculateBonusNumberByYearDayNumber(dateRange);
        this.calculateBonusNumberInActualMonthName(dateRange);
    }

    private calculateBonusNumberFrequency(dateRange: DateScoreFilter): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange ]));
    }

    private calculateBonusNumbersByDayOfTheWeek(dateRange: DateScoreFilter): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateBonusNumberInActualMonthName(dateRange: DateScoreFilter): void {
        this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateBonusNumberByOddOrEvenDay(dateRange: DateScoreFilter): void {
        this.bonusNumberByOddOrEvenDay$ = this.store.pipe(select(selectBonusNumberByFilter, [ dateRange, this.oddOrEvenDayFilter ]));
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

}
