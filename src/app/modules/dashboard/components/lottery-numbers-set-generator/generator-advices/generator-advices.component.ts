import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import { Observable } from 'rxjs';
import { NumberData } from 'src/app/shared/interfaces';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TimeService } from 'src/app/shared/services/time.service';
import {
    selectBonusNumberByDayOfTheWeek,
    selectBonusNumberByEvenDay,
    selectBonusNumberByEvenMonth,
    selectBonusNumberByMonthDayNumber,
    selectBonusNumberByOddDay,
    selectBonusNumberByOddMonth,
    selectBonusNumberByYearDayNumber,
    selectBonusNumberByYearQuarter,
    selectBonusNumberFrequency,
    selectBonusNumberInActualMonthName,
    selectNumberOnIndexByEvenDay,
    selectNumberOnIndexByEvenMonth,
    selectNumberOnIndexByOddDay,
    selectNumberOnIndexByOddMonth, selectNumberOnIndexByYearDayNumber, selectNumberOnIndexByYearQuarter,
    selectNumberOnIndexFrequency,
    selectNumberOnIndexFrequencyByDayOfTheWeek,
    selectNumberOnIndexInActualMonthName,
    selectNumbersByEvenDay,
    selectNumbersByEvenMonth,
    selectNumbersByMonthDayNumber,
    selectNumbersByOddDay,
    selectNumbersByOddMonth,
    selectNumbersByYearDayNumber,
    selectNumbersByYearQuarter,
    selectNumbersFrequency,
    selectNumbersFrequencyByDayOfTheWeek,
    selectNumbersInActualMonthName,
} from 'src/app/modules/dashboard/store/selectors';
import { LOTTERY_NUMBERS_ARRAY_LENGTH } from 'src/app/shared/constants';
import { last } from 'lodash';
import { BaseGeneratorAdvicesComponent } from 'src/app/shared/components';

@AutoUnsubscribe()
@Component({
    selector: 'lm-generator-advices',
    templateUrl: './generator-advices.component.html',
    styleUrls: [ './generator-advices.component.scss' ],
})
export class GeneratorAdvicesComponent extends BaseGeneratorAdvicesComponent implements OnInit, OnDestroy {
    /* numbers */
    public numbersFrequency$: Observable<NumberData[]>;
    public numbersFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numbersInActualMonthName$: Observable<NumberData[]>;
    public numbersByOddOrEvenDay$: Observable<NumberData[]>;
    public numbersByOddOrEvenMonth$: Observable<NumberData[]>;
    public numbersByYearQuarter$: Observable<NumberData[]>;
    public numbersByYearDayNumber$: Observable<NumberData[]>;
    public numbersByMonthDayNumber$: Observable<NumberData[]>;

    /* numbers by indexes */
    public numberOnIndexFrequency$: Observable<NumberData[]>;
    public numberOnIndexFrequencyByDayOfTheWeek$: Observable<NumberData[]>;
    public numberOnIndexInActualMonthName$: Observable<NumberData[]>;
    public numberOnIndexByOddOrEvenDay$: Observable<NumberData[]>;
    public numberOnIndexByOddOrEvenMonth$: Observable<NumberData[]>;
    public numberOnIndexByYearQuarter$: Observable<NumberData[]>;
    public numberOnIndexByYearDayNumber$: Observable<NumberData[]>;

    /* bonus numbers */
    public bonusNumberFrequency$: Observable<NumberData[]>;
    public bonusNumberByDayOfTheWeek$: Observable<NumberData[]>;
    public bonusNumberInActualMonthName$: Observable<NumberData[]>;
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

        this.calculateNumberAdvicesForIndexes(this.dateRange);
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
        this.calculateNumbersInActualMonthName(dateRange);
        this.calculateNumbersByOddOrEvenDay(dateRange);
        this.calculateNumbersByOddOrEvenMonth(dateRange);
        this.calculateNumbersByYearQuarter(dateRange);
        this.calculateNumbersByYearDayNumber(dateRange);
        this.calculateNumbersByMonthDayNumber(dateRange);

        this.calculateNumberAdvicesForIndexes(dateRange);
    }

    private calculateBonusNumberAdvices(dateRange: DateRange): void {
        this.calculateBonusNumberFrequency(dateRange);
        this.calculateBonusNumbersByDayOfTheWeek(dateRange);
        this.calculateBonusNumberInActualMonthName(dateRange);
        this.calculateBonusNumberByOddOrEvenDay(dateRange);
        this.calculateBonusNumberByOddOrEvenMonth(dateRange);
        this.calculateBonusNumberByYearQuarter(dateRange);
        this.calculateBonusNumberByYearDayNumber(dateRange);
        this.calculateBonusNumberByMonthDayNumber(dateRange);
    }

    private calculateNumberAdvicesForIndexes(dateRange: DateRange): void {
        /* numbers indexes */
        this.calculateNumberOnIndexFrequency(this.numbers.length, dateRange);
        this.calculateNumberOnIndexFrequencyByDayOfTheWeek(this.numbers.length, dateRange);
        this.calculateNumberOnIndexInActualMonthName(this.numbers.length, dateRange);
        this.calculateNumberOnIndexByOddOrEvenDay(this.numbers.length, dateRange);
        this.calculateNumberOnIndexByOddOrEvenMonth(this.numbers.length, dateRange);
        this.calculateNumberOnIndexByYearQuarter(this.numbers.length, dateRange);
        this.calculateNumberOnIndexByYearDayNumber(this.numbers.length, dateRange);
    }

    /* numbers */
    private calculateNumbersFrequency(dateRange: DateRange): void {
        this.numbersFrequency$ = this.store.pipe(select(selectNumbersFrequency, { dateRange }));
    }

    private calculateNumbersFrequencyByDayOfTheWeek(dateRange: DateRange): void {
        this.numbersFrequencyByDayOfTheWeek$ = this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange }));
    }

    private calculateNumbersInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numbersInActualMonthName$ = this.store.pipe(select(selectNumbersInActualMonthName, { dateRange }));
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

    private calculateNumberOnIndexInActualMonthName(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH && (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE)) {
            this.numberOnIndexInActualMonthName$ = this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByOddOrEvenDay(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH) {
            this.numberOnIndexByOddOrEvenDay$ = this.timeService.isOddDayToday
                ? this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex, dateRange }))
                : this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByOddOrEvenMonth(numberIndex: number, dateRange: DateRange): void {
        if (this.numbers.length < LOTTERY_NUMBERS_ARRAY_LENGTH && (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE)) {
            this.numberOnIndexByOddOrEvenMonth$ = this.timeService.isOddDayToday
                ? this.store.pipe(select(selectNumberOnIndexByOddMonth, { numberIndex, dateRange }))
                : this.store.pipe(select(selectNumberOnIndexByEvenMonth, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByYearQuarter(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.LAST_YEAR || dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByYearQuarter$ = this.store.pipe(select(selectNumberOnIndexByYearQuarter, { numberIndex, dateRange }));
        }
    }

    private calculateNumberOnIndexByYearDayNumber(numberIndex: number, dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.numberOnIndexByYearDayNumber$ = this.store.pipe(select(selectNumberOnIndexByYearDayNumber, { numberIndex, dateRange }));
        }
    }

    /* bonus number */
    private calculateBonusNumberFrequency(dateRange: DateRange): void {
        this.bonusNumberFrequency$ = this.store.pipe(select(selectBonusNumberFrequency, { dateRange }));
    }

    private calculateBonusNumbersByDayOfTheWeek(dateRange: DateRange): void {
        this.bonusNumberByDayOfTheWeek$ = this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange }));
    }

    private calculateBonusNumberInActualMonthName(dateRange: DateRange): void {
        if (dateRange === DateRange.ENTIRE_RANGE) {
            this.bonusNumberInActualMonthName$ = this.store.pipe(select(selectBonusNumberInActualMonthName));
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
