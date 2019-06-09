import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-base-generator-advices',
    template: 'no template for base components!',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseGeneratorAdvicesComponent {
    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    private readonly todayDayName: string = this.timeService.todayDayName;
    private readonly todayMonthName: string = this.timeService.todayMonthName;
    private readonly todayYearDayNumber: number = this.timeService.todayYearDayNumber;
    private readonly todayMonthDayNumber: number = this.timeService.todayMonthDayNumber;

    protected numbers: number[];
    protected bonusNumber: number;

    constructor(
        protected readonly timeService: TimeService,
    ) {
    }

    private get dateRangeSelectOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: DateRange.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateRange.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateRange.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateRange.LAST_WEEK },
        ];
    }

    private get adviceTypeSelectOptions(): SelectItem[] {
        return [
            { label: 'Ogólne', value: AdviceTypeEnum.GENERAL },
            { label: 'Liczby 5-35', value: AdviceTypeEnum.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceTypeEnum.BONUS_NUMBER },
        ];
    }

    public get isEntireRange(): boolean {
        return this.dateRange === DateRange.ENTIRE_RANGE;
    }

    public get isLastYearRange(): boolean {
        return this.dateRange === DateRange.LAST_YEAR;
    }

    private get dateRangeLabel(): string {
        switch (this.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                return 'dla wszystkich losowań';
            }
            case DateRange.LAST_YEAR: {
                return 'dla losowań z ostatniego roku';
            }
            case DateRange.LAST_MONTH: {
                return 'dla losowań z ostatniego miesiąca';
            }
            case DateRange.LAST_WEEK: {
                return 'dla losowań z ostatniego tygodnia';
            }
        }
    }

    /* numbers labels */
    public get numbersFrequencyLabel(): string {
        console.log(`Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel}`);
        return `Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel}`;
    }

    public get numbersFrequencyByDayOfTheWeekLabel(): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel}`;
    }

    public get mostPopularNumbersInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName} ${this.dateRangeLabel}`;
    }

    public get numbersByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste ${this.dateRangeLabel}` : `Częstotliwość losowania liczb w dni parzyste ${this.dateRangeLabel}`;
    }

    public get numbersByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste ${this.dateRangeLabel}` : `Częstotliwość losowania liczb w miesiące parzyste ${this.dateRangeLabel}`;
    }

    public get numbersByYearQuarterLabel(): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb w pierwszym kwartale roku ${this.dateRangeLabel}`;
            }
            case 2: {
                return `Częstotliwość losowania liczb w drugim kwartale roku ${this.dateRangeLabel}`;
            }
            case 3: {
                return `Częstotliwość losowania liczb w trzecim kwartale roku ${this.dateRangeLabel}`;
            }
            case 4: {
                return `Częstotliwość losowania liczb w czwartym kwartale roku ${this.dateRangeLabel}`;
            }
        }
    }

    public get numbersByYearDayNumberLabel(): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel}`;
    }

    public get numbersByMonthDayNumberLabel(): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel}`;
    }

    /* numbers by indexes labels */
    public get numberOnIndexFrequencyLabel(): string {
        return `Częstotliwość losowania liczb na indeksie nr.${this.numbers.length + 1} ${this.dateRangeLabel}`;
    }

    public get numberOnIndexFrequencyByDayOfTheWeekLabel(): string {
        return `'Częstotliwość losowania liczb na indeksie nr.${this.numbers.length +1} w dniu ${this.todayDayName} ${this.dateRangeLabel}`;
    }

    public get mostPopularNumberOnIndexInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb na indeksie nr.${this.numbers.length + 1} w miesiącu ${this.todayMonthName} ${this.dateRangeLabel}`;
    }

    /* bonus number labels */
    public get bonusNumberFrequencyLabel(): string {
        return `Częstotliwość losowania liczb bonusowych ${this.dateRangeLabel}`;
    }

    public get mostPopularBonusNumberByDayOfTheWeekLabel(): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel}`;
    }

    public get mostPopularBonusNumberInActualMonthNameLabel(): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName} ${this.dateRangeLabel}`;
    }

    public get bonusNumberByOddOrEvenDayLabel(): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste ${this.dateRangeLabel}` : `Częstotliwość losowania liczby bonusowej w dni parzyste ${this.dateRangeLabel}`;
    }

    public get bonusNumberByOddOrEvenMonthLabel(): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste ${this.dateRangeLabel}` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste ${this.dateRangeLabel}`;
    }

    public get bonusNumberByYearQuarterLabel(): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczby bonusowej w pierwszym kwartale roku ${this.dateRangeLabel}`;
            }
            case 2: {
                return `Częstotliwość losowania liczby bonusowej w drugim kwartale roku ${this.dateRangeLabel}`;
            }
            case 3: {
                return `Częstotliwość losowania liczby bonusowej w trzecim kwartale roku ${this.dateRangeLabel}`;
            }
            case 4: {
                return `Częstotliwość losowania liczby bonusowej w czwartym kwartale roku ${this.dateRangeLabel}`;
            }
        }
    }

    public get bonusNumberByYearDayNumberLabel(): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku ${this.dateRangeLabel}`;
    }

    public get bonusNumberByMonthDayNumberLabel(): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel}`;
    }
}
