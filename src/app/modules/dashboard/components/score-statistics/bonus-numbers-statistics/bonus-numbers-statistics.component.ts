import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { DateScoreFilter } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { selectBonusNumberByFilter } from 'src/app/modules/dashboard/store/selectors';
import { AppState } from 'src/app/store';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import Bind from 'lodash-decorators';

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

    ngOnInit() {

    }

    @Bind
    private calculate(): void {
        this.calculateBonusNumberFrequency();
        this.calculateBonusNumbersByDayOfTheWeek();
        this.calculateBonusNumberByOddOrEvenDay();

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateBonusNumberByOddOrEvenMonth();
            this.calculateBonusNumberByYearQuarter();
            this.calculateBonusNumberByMonthDayNumber();
        }

        if (this.isEntireRangeDateRange) {
            this.calculateBonusNumberByYearDayNumber();
            this.calculateBonusNumberInActualMonthName();
        }
    }

    public bonusNumberFrequencyLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych ${this.dateRangeLabel(dateRange)}`;
    }

    public bonusNumberByDayOfTheWeekLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    public bonusNumberInActualMonthNameLabel(dateRange: DateScoreFilter): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    public bonusNumberByOddOrEvenDayLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    public bonusNumberByOddOrEvenMonthLabel(dateRange: DateScoreFilter): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

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

    public bonusNumberByYearDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    public bonusNumberByMonthDayNumberLabel(dateRange: DateScoreFilter): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    private calculateBonusNumberFrequency(): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange ]));
    }

    private calculateBonusNumbersByDayOfTheWeek(): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, DateScoreFilter.SAME_WEEK_DAY_AS_TODAY ]));
    }

    private calculateBonusNumberInActualMonthName(): void {
        this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, DateScoreFilter.SAME_MONTH_AS_TODAY ]));
    }

    private calculateBonusNumberByOddOrEvenDay(): void {
        this.bonusNumberByOddOrEvenDay$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, this.oddOrEvenDayFilter ]));
    }

    private calculateBonusNumberByOddOrEvenMonth(): void {
        this.bonusNumberByOddOrEvenMonth$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, this.oddOrEvenMonthFilter ]));
    }

    private calculateBonusNumberByYearQuarter(): void {
        this.bonusNumberByYearQuarter$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, DateScoreFilter.SAME_YEAR_QUARTER ]));
    }

    private calculateBonusNumberByYearDayNumber(): void {
        this.bonusNumberByYearDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, DateScoreFilter.SAME_YEAR_DAY_NUMBER ]));
    }

    private calculateBonusNumberByMonthDayNumber(): void {
        this.bonusNumberByMonthDayNumber$ = this.store.pipe(select(selectBonusNumberByFilter, [ this.dateRange, DateScoreFilter.SAME_MONTH_DAY_NUMBER ]));
    }

}
