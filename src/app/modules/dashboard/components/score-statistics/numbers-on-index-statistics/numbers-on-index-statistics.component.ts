import { ChangeDetectionStrategy, Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DateScoreFilter } from 'src/app/shared/enums';
import { selectNumbersByFilter } from 'src/app/modules/dashboard/store/selectors';
import { Observable } from 'rxjs';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { AdviceParagraphComponent } from 'src/app/modules/dashboard/components/score-statistics/advice-paragraph/advice-paragraph.component';

@Component({
    selector: 'lm-numbers-on-index-statistics',
    templateUrl: './numbers-on-index-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersOnIndexStatisticsComponent extends BaseStatisticsComponent implements OnChanges {

    @ViewChildren(AdviceParagraphComponent) public readonly adviceParagraphList: QueryList<AdviceParagraphComponent>;
    @Input() public readonly dateRange: DateScoreFilter;

    private readonly numberIndexMap: Map<number, number> = new Map<number, number>([ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ] ]);

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

    ngOnChanges(changes: SimpleChanges): void {
        this.updateNumberIndexMap();
        this.calculate();
    }

    private updateNumberIndexMap(): void {
        if (this.adviceParagraphList) {
            this.adviceParagraphList.forEach((item: AdviceParagraphComponent, index: number) => {
                this.numberIndexMap.set(index, item.numberIndex);
            });
        }
    }

    private calculate(): void {
        this.calculateNumberOnIndexFrequency(this.numberIndexMap.get(0));
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numberIndexMap.get(1));
        this.calculateNumberOnIndexByOddOrEvenDay(this.numberIndexMap.get(2));

        if (this.isEntireRangeDateRange || this.isLastYearRangeDateRange) {
            this.calculateNumberOnIndexByOddOrEvenMonth(this.numberIndexMap.get(3));
            this.calculateNumberOnIndexByYearQuarter(this.numberIndexMap.get(4));
            this.calculateNumberOnIndexByMonthDayNumber(this.numberIndexMap.get(5));
        }

        if (this.isEntireRangeDateRange) {
            this.calculateNumberOnIndexInActualMonthName(this.numberIndexMap.get(6));
            this.calculateNumberOnIndexByYearDayNumber(this.numberIndexMap.get(7));
        }
    }

    public get numberOnIndexFrequencyLabel(): string {
        return `Częstotliwość losowania liczb na wybranym indeksie`;
    }

    public get numberOnIndexFrequencyByDayOfTheWeekLabel(): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w dniu ${this.todayDayName}`;
    }

    public get numberOnIndexInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb na wybranym indeksie w miesiącu ${this.todayMonthName}`;
    }

    public get numberOnIndexByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w dni nieparzyste`
            : `Częstotliwość losowania liczb na wybranym indeksie w dni parzyste`;

    }

    public get numberOnIndexByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddDayToday
            ? `Częstotliwość losowania liczb na wybranym indeksie w miesiące nieparzyste`
            : `Częstotliwość losowania liczb na wybranym indeksie w miesiące parzyste`;
    }

    public get numberOnIndexByYearQuarterLabel(): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb na wybranym indeksie w pierwszym kwartale roku`;
            }
            case 2: {
                return `Częstotliwość losowania liczb na wybranym indeksie w drugim kwartale roku`;
            }
            case 3: {
                return `Częstotliwość losowania liczb na wybranym indeksie w trzecim kwartale roku`;
            }
            case 4: {
                return `Częstotliwość losowania liczb na wybranym indeksie w czwartym kwartale roku`;
            }
        }
    }

    public get numberOnIndexByYearDayNumberLabel(): string {
        return `Częstoliwość losowania liczb na wybranym indeksie w ${this.timeService.todayYearDayNumber} dniu roku`;
    }

    public get numberOnIndexByMonthDayNumberLabel(): string {
        return `Częstoliwość losowania liczb w na wybranym indeksie w ${this.timeService.todayMonthDayNumber} dniu miesiąca`;
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
