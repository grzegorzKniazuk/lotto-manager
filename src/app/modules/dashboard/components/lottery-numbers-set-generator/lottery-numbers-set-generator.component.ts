import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lotteryCouponValidity } from 'src/app/shared/validators/lottery-coupon-validity.validator';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { combineLatest, Observable } from 'rxjs';
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
    selectNumberOnIndexByMonthDayNumber,
    selectNumberOnIndexByOddDay,
    selectNumberOnIndexByOddMonth,
    selectNumberOnIndexByYearDayNumber,
    selectNumberOnIndexByYearQuarter,
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
import { first, map } from 'rxjs/operators';
import { DateRange } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';
import { NumberData } from 'src/app/shared/interfaces';
import { flatten, forEach, forIn, pick, sortBy } from 'lodash';
import { Bind } from 'lodash-decorators';
import { NUMBER_DATA_BALL_KEY, NUMBER_DATA_VALUE_KEY } from 'src/app/shared/constants';

@Component({
    selector: 'lm-lottery-numbers-set-generator',
    templateUrl: './lottery-numbers-set-generator.component.html',
    styleUrls: [ './lottery-numbers-set-generator.component.scss' ],
})
export class LotteryNumbersSetGeneratorComponent implements OnInit {

    public generatorForm: FormGroup = this.form;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store<AppState>,
        private readonly timeService: TimeService,
    ) {
    }

    private get form(): FormGroup {
        return this.formBuilder.group({
            lotteryNumbers: [ [], [ Validators.required, lotteryCouponValidity ] ],
        });
    }

    ngOnInit() {
    }

    public generate(): void {
        this.selectNumberData();
        this.selectBonusNumberData();
    }

    private selectNumberData(): void {
        combineLatest(
            this.store.pipe(select(selectNumbersFrequency, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersFrequency, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectNumbersFrequency, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectNumbersFrequency, { dateRange: DateRange.LAST_WEEK })),
            this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectNumbersFrequencyByDayOfTheWeek, { dateRange: DateRange.LAST_WEEK })),
            this.store.pipe(select(selectNumbersInActualMonthName, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByYearQuarter, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByYearQuarter, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectNumbersByYearDayNumber, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByMonthDayNumber, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByMonthDayNumber, { dateRange: DateRange.LAST_YEAR })),
            ...this.numberStreamsByDateCondition,
            ...this.numberStreamsByBallIndexes,
            ...this.numberStreamsByBallIndexesAndDateCondition,
        ).pipe(
            first(),
            map((items: NumberData[]) => flatten(items)),
            map((items: NumberData[]) => items.map((item) => pick(item, [ NUMBER_DATA_BALL_KEY, NUMBER_DATA_VALUE_KEY ]))),
        ).subscribe(this.calculateNumberDrawFrequency);
    }

    private selectBonusNumberData(): void {
        combineLatest(
            this.store.pipe(select(selectBonusNumberFrequency, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberFrequency, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberFrequency, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectBonusNumberFrequency, { dateRange: DateRange.LAST_WEEK })),
            this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectBonusNumberByDayOfTheWeek, { dateRange: DateRange.LAST_WEEK })),
            this.store.pipe(select(selectBonusNumberByMonthDayNumber, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByMonthDayNumber, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberByYearDayNumber, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByYearQuarter, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByYearQuarter, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberInActualMonthName, { dateRange: DateRange.ENTIRE_RANGE })),
            ...this.bonusNumberStreamsByDateCondition,
        ).pipe(
            first(),
            map((items: NumberData[]) => flatten(items)),
            map((items: NumberData[]) => items.map((item) => pick(item, [ NUMBER_DATA_BALL_KEY, NUMBER_DATA_VALUE_KEY ]))),
        ).subscribe(this.calculateNumberDrawFrequency);
    }

    @Bind
    private calculateNumberDrawFrequency(data: Partial<NumberData>[]): void {
        const results = {};

        forEach(data, (numberData: Partial<NumberData>) => {
            if (results.hasOwnProperty(numberData.ball)) {
                results[numberData.ball] = results[numberData.ball] + numberData.value;
            } else {
                Object.defineProperty(results, numberData.ball, { value: numberData.value, enumerable: true, configurable: true, writable: true });
            }
        });

        console.log(this.sortObjectByValue(results));
    }

    private sortObjectByValue(obj: { [key: number]: number }): { [key: number]: number }[] {
        let objArray = [];

        forIn(obj, (value, key) => {
            objArray.push({ key, value });
        });

        objArray = sortBy(objArray, [ 'value' ], [ 'desc' ]);

        return objArray;
    }

    private get numberStreamsByBallIndexes(): Observable<NumberData[]>[] {
        const streams: Observable<NumberData[]>[] = [];

        for (let i = 0; i < 5; i++) {
            streams.push(
                this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex: i, dateRange: DateRange.LAST_MONTH })),
                this.store.pipe(select(selectNumberOnIndexFrequency, { numberIndex: i, dateRange: DateRange.LAST_WEEK })),
                this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex: i, dateRange: DateRange.LAST_MONTH })),
                this.store.pipe(select(selectNumberOnIndexFrequencyByDayOfTheWeek, { numberIndex: i, dateRange: DateRange.LAST_WEEK })),
                this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex: i, dateRange: DateRange.LAST_MONTH })),
                this.store.pipe(select(selectNumberOnIndexInActualMonthName, { numberIndex: i, dateRange: DateRange.LAST_WEEK })),
                this.store.pipe(select(selectNumberOnIndexByYearQuarter, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByYearQuarter, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexByYearDayNumber, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByMonthDayNumber, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByMonthDayNumber, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
            );
        }
        return streams;
    }

    private get numberStreamsByBallIndexesAndDateCondition(): Observable<NumberData[]>[] {
        const streams: Observable<NumberData[]>[] = [];

        if (this.timeService.isOddDayToday) {
            streams.push(...this.numberOnIndexSelectorsForOddDay);
        } else {
            streams.push(...this.numberOnIndexSelectorsForEvenDay);
        }
        if (this.timeService.isOddMonthToday) {
            streams.push(...this.numberOnIndexSelectorsForOddMonth);
        }
        {
            streams.push(...this.numberOnIndexSelectorsForEvenMonth);
        }

        return streams;
    }

    private get numberOnIndexSelectorsForEvenDay(): Observable<NumberData[]>[] {
        const observableArray = [];

        for (let i = 0; i < 5; i++) {
            observableArray.push(
                this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex: i, dateRange: DateRange.LAST_MONTH })),
                this.store.pipe(select(selectNumberOnIndexByEvenDay, { numberIndex: i, dateRange: DateRange.LAST_WEEK })),
            );
        }
        return observableArray;
    }

    private get numberOnIndexSelectorsForOddDay(): Observable<NumberData[]>[] {
        const observableArray = [];

        for (let i = 0; i < 5; i++) {
            observableArray.push(
                this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
                this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex: i, dateRange: DateRange.LAST_MONTH })),
                this.store.pipe(select(selectNumberOnIndexByOddDay, { numberIndex: i, dateRange: DateRange.LAST_WEEK })),
            );
        }
        return observableArray;
    }

    private get numberOnIndexSelectorsForEvenMonth(): Observable<NumberData[]>[] {
        const observableArray = [];

        for (let i = 0; i < 5; i++) {
            observableArray.push(
                this.store.pipe(select(selectNumberOnIndexByEvenMonth, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByEvenMonth, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
            );
        }
        return observableArray;
    }

    private get numberOnIndexSelectorsForOddMonth(): Observable<NumberData[]>[] {
        const observableArray = [];

        for (let i = 0; i < 5; i++) {
            observableArray.push(
                this.store.pipe(select(selectNumberOnIndexByOddMonth, { numberIndex: i, dateRange: DateRange.ENTIRE_RANGE })),
                this.store.pipe(select(selectNumberOnIndexByOddMonth, { numberIndex: i, dateRange: DateRange.LAST_YEAR })),
            );
        }
        return observableArray;
    }

    private get numberStreamsByDateCondition(): Observable<NumberData[]>[] {
        const streams: Observable<NumberData[]>[] = [];

        if (this.timeService.isOddDayToday) {
            streams.push(...this.numbersSelectorsForOddDay);
        } else {
            streams.push(...this.numbersSelectorsForEvenDay);
        }
        if (this.timeService.isOddMonthToday) {
            streams.push(...this.numbersSelectorsForOddMonth);
        }
        {
            streams.push(...this.numbersSelectorsForEvenMonth);
        }

        return streams;
    }

    private get numbersSelectorsForEvenDay(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectNumbersByEvenDay, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByEvenDay, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectNumbersByEvenDay, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectNumbersByEvenDay, { dateRange: DateRange.LAST_WEEK })),
        ];
    }

    private get numbersSelectorsForOddDay(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectNumbersByOddDay, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByOddDay, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectNumbersByOddDay, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectNumbersByOddDay, { dateRange: DateRange.LAST_WEEK })),
        ];
    }

    private get numbersSelectorsForEvenMonth(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectNumbersByEvenMonth, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByEvenMonth, { dateRange: DateRange.LAST_YEAR })),
        ];
    }

    private get numbersSelectorsForOddMonth(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectNumbersByOddMonth, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectNumbersByOddMonth, { dateRange: DateRange.LAST_YEAR })),
        ];
    }

    private get bonusNumberStreamsByDateCondition(): Observable<NumberData[]>[] {
        const streams: Observable<NumberData[]>[] = [];

        if (this.timeService.isOddDayToday) {
            streams.push(...this.bonusNumberSelectorsForOddDay);
        } else {
            streams.push(...this.bonusNumberSelectorsForEvenDay);
        }
        if (this.timeService.isOddMonthToday) {
            streams.push(...this.bonusNumberSelectorsForOddMonth);
        }
        {
            streams.push(...this.bonusNumberSelectorsForEvenMonth);
        }

        return streams;
    }

    private get bonusNumberSelectorsForEvenDay(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectBonusNumberByEvenDay, { dateRange: DateRange.LAST_WEEK })),
        ];
    }

    private get bonusNumberSelectorsForOddDay(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectBonusNumberByOddDay, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByOddDay, { dateRange: DateRange.LAST_YEAR })),
            this.store.pipe(select(selectBonusNumberByOddDay, { dateRange: DateRange.LAST_MONTH })),
            this.store.pipe(select(selectBonusNumberByOddDay, { dateRange: DateRange.LAST_WEEK })),
        ];
    }

    private get bonusNumberSelectorsForEvenMonth(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectBonusNumberByEvenMonth, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByEvenMonth, { dateRange: DateRange.LAST_YEAR })),
        ];
    }

    private get bonusNumberSelectorsForOddMonth(): Observable<NumberData[]>[] {
        return [
            this.store.pipe(select(selectBonusNumberByOddMonth, { dateRange: DateRange.ENTIRE_RANGE })),
            this.store.pipe(select(selectBonusNumberByOddMonth, { dateRange: DateRange.LAST_YEAR })),
        ];
    }
}
