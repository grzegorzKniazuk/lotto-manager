import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import { Observable } from 'rxjs';
import { NumberData } from 'src/app/shared/interfaces';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TimeService } from 'src/app/shared/services/time.service';
import {
    selectBonusNumberByEvenDay,
    selectBonusNumberByEvenMonth,
    selectBonusNumberByMonthDayNumber,
    selectBonusNumberByOddDay,
    selectBonusNumberByOddMonth,
    selectBonusNumberByYearDayNumber,
    selectBonusNumberByYearQuarter,
    selectBonusNumberFrequency,
    selectMostPopularBonusNumberByDayOfTheWeek,
    selectMostPopularBonusNumberInActualMonthName,
    selectMostPopularNumberOnIndexInActualMonthName,
    selectMostPopularNumbersInActualMonthName,
    selectNumberOnIndexFrequency,
    selectNumberOnIndexFrequencyByDayOfTheWeek,
    selectNumbersByEvenDay,
    selectNumbersByEvenMonth,
    selectNumbersByMonthDayNumber,
    selectNumbersByOddDay,
    selectNumbersByOddMonth,
    selectNumbersByYearDayNumber,
    selectNumbersByYearQuarter,
    selectNumbersFrequency,
    selectNumbersFrequencyByDayOfTheWeek,
} from 'src/app/modules/dashboard/store/selectors';
import { LOTTERY_NUMBERS_ARRAY_LENGTH } from 'src/app/shared/constants';
import { last } from 'lodash';
import { BaseGeneratorAdvicesComponent } from 'src/app/shared/components';

@AutoUnsubscribe()
@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorAdvicesComponent extends BaseGeneratorAdvicesComponent implements OnInit, OnDestroy {
    /* numbers */
    public numbersFrequency$: Observable<NumberData[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public mostPopularNumbersInActualMonthName$: Observable<NumberData[]>;
    public numbersByOddOrEvenDay$: Observable<NumberData[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberData[]>;
    public numbersByYearQuarter$: Observable<NumberData[]>;
    public numbersByYearDayNumber$: Observable<NumberData[]>;
    public numbersByMonthDayNumber$: Observable<NumberData[]>;

    /* numbers by indexes */
    public numberOnIndexFrequency$: Observable<NumberData[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public mostPopularNumberOnIndexInActualMonthName$: Observable<NumberData[]>;

    /* bonus numbers */
    public bonusNumberFrequency$: Observable<NumberData[]>;
    public mostPopularBonusNumberByDayOfTheWeek$: Observable<NumberData[]>;
    public mostPopularBonusNumberInActualMonthName$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenDay$: Observable<NumberData[]>;
    public bonusNumberByOddOrEvenMonth$: Observable<NumberData[]>;
    public bonusNumberByYearQuarter$: Observable<NumberData[]>;
    public bonusNumberByYearDayNumber$: Observable<NumberData[]>;
    public bonusNumberByMonthDayNumber$: Observable<NumberData[]>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    @Input()
    public set couponNumbers({ lotteryNumbers }: { lotteryNumbers: number[] }) {
        this.numbers = lotteryNumbers.slice(0, lotteryNumbers.length - 1);
        this.bonusNumber = last(lotteryNumbers);

        this.calculateNumberOnIndexFrequency(this.numbers.length, this.dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, this.dateRange);
        this.calculateMostPopularNumberOnIndexInActualMonthName(this.numbers.length, this.dateRange);
    }

    ngOnInit() {
        this.calculateGeneralAdvices(DateRange.ENTIRE_RANGE);
    }

    ngOnDestroy() {
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
        this.calculateMostPopularNumbersInActualMonthName(dateRange);
        this.calculateNumbersByOddOrEvenDay(dateRange);
        this.calculateNumbersByOddOrEvenMonth(dateRange);
        this.calculateNumbersByYearQuarter(dateRange);
        this.calculateNumbersByYearDayNumber(dateRange);
        this.calculateNumbersByMonthDayNumber(dateRange);

        /* numbers indexes */
        this.calculateNumberOnIndexFrequency(this.numbers.length, dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, dateRange);
        this.calculateMostPopularNumberOnIndexInActualMonthName(this.numbers.length, dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateMostPopularBonusNumberInActualMonthName(dateRange);
        this.calculateBonusNumberByOddOrEvenDay(dateRange);
        this.calculateBonusNumberByOddOrEvenMonth(dateRange);
        this.calculateBonusNumberByYearQuarter(dateRange);
        this.calculateBonusNumberByYearDayNumber(dateRange);
        this.calculateBonusNumberByMonthDayNumber(dateRange);
    }

    /* numbers */
    private calculateNumbersFrequency(dateRange: DateRange): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersFrequency, { dateRange }));
    }

    private calculateNumbersFrequencyByDayOfTheWeek(dateRange: DateRange): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange }));
    }

    private calculateMostPopularNumbersInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.mostPopularNumbersInActualMonthName$ = this.store.pipe(select(selectMostPopularNumbersInActualMonthName, { dateRange }));
        }
    }

    private calculateNumbersByOddOrEvenDay(dateRange: DateRange): void {
        this.numbersByOddOrEvenDay$ = this.timeService.isOddDayToday
            ? this.store.pipe(select(selectNumbersByOddDay, { dateRange }))
            : this.store.pipe(select(selectNumbersByEvenDay, { dateRange }));
    }

    private calculateNumbersByOddOrEvenMonth(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByOddOrEvenMonth$ = this.timeService.isOddMonthToday
                ? this.store.pipe(select(selectNumbersByOddMonth, { dateRange }))
                : this.store.pipe(select(selectNumbersByEvenMonth, { dateRange }));
        }
    }

    private calculateNumbersByYearQuarter(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByYearQuarter$ = this.store.pipe(select(selectNumbersByYearQuarter, { dateRange }));
        }
    }

    private calculateNumbersByYearDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByYearDayNumber$ = this.store.pipe(select(selectNumbersByYearDayNumber));
        }
    }

    private calculateNumbersByMonthDayNumber(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersByMonthDayNumber$ = this.store.pipe(select(selectNumbersByMonthDayNumber, { dateRange }));
        }
    }

    /* numbers by indexes */
    private calculateNumberOnIndexFrequency(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.numberOnIndexFrequency$ = this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexFrequencyByDayOfTheWeek(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.numberOnIndexFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex, dateRange }));
        }
    }

    private calculateMostPopularNumberOnIndexInActualMonthName(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH && (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE)) {
            this.mostPopularNumberOnIndexInActualMonthName$ = this.store.pipe(select(selectMostPopularNumberOnIndexInActualMonthName, { numberIndex, dateRange }));
        }
    }

    /* bonus number */
    private calculateBonusNumberFrequency(dateRange: DateRange): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberFrequency, { dateRange }));
    }

    private calculateMostPopularBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.mostPopularBonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectMostPopularBonusNumberByDayOfTheWeek, { dateRange }));
    }

    private calculateMostPopularBonusNumberInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.mostPopularBonusNumberInActualMonthName$ = this.store.pipe(select(selectMostPopularBonusNumberInActualMonthName));
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
