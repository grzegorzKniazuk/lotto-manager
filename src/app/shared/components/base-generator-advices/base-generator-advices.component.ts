import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AdviceTypeEnum, DateRange } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';
import { Memoize } from 'lodash-decorators';

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

    @Memoize
    public isEntireRange(dateRange: DateRange): boolean {
        return dateRange === DateRange.ENTIRE_RANGE;
    }

    @Memoize
    public isLastYearRange(dateRange: DateRange): boolean {
        return dateRange === DateRange.LAST_YEAR;
    }

    @Memoize
    private dateRangeLabel(dateRange: DateRange): string {
        switch (dateRange) {
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
    @Memoize
    public numbersFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania wszystkich liczb ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersFrequencyByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public mostPopularNumbersInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenDayLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByOddOrEvenMonthLabel(dateRange: DateRange): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczb w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByYearQuarterLabel(dateRange: DateRange): string {
        switch (this.timeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb w pierwszym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 2: {
                return `Częstotliwość losowania liczb w drugim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 3: {
                return `Częstotliwość losowania liczb w trzecim kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
            case 4: {
                return `Częstotliwość losowania liczb w czwartym kwartale roku ${this.dateRangeLabel(dateRange)}`;
            }
        }
    }

    @Memoize
    public numbersByYearDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numbersByMonthDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczb w ${this.timeService.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }

    /* numbers by indexes labels */
    @Memoize
    public numberOnIndexFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb na indeksie nr.${this.numbers.length + 1} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public numberOnIndexFrequencyByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `'Częstotliwość losowania liczb na indeksie nr.${this.numbers.length +1} w dniu ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public mostPopularNumberOnIndexInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb na indeksie nr.${this.numbers.length + 1} w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    /* bonus number labels */
    @Memoize
    public bonusNumberFrequencyLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public mostPopularBonusNumberByDayOfTheWeekLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${this.todayDayName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public mostPopularBonusNumberInActualMonthNameLabel(dateRange: DateRange): string {
        return `Częstotliwość losowania liczb bonusowych w miesiącu ${this.todayMonthName} ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenDayLabel(dateRange: DateRange): string {
        return this.timeService.isOddDayToday ? `Częstotliwość losowania liczby bonusowej w dni nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w dni parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByOddOrEvenMonthLabel(dateRange: DateRange): string {
        return this.timeService.isOddMonthToday ? `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste ${this.dateRangeLabel(dateRange)}` : `Częstotliwość losowania liczby bonusowej w miesiące parzyste ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByYearQuarterLabel(dateRange: DateRange): string {
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

    @Memoize
    public bonusNumberByYearDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayYearDayNumber} dniu roku ${this.dateRangeLabel(dateRange)}`;
    }

    @Memoize
    public bonusNumberByMonthDayNumberLabel(dateRange: DateRange): string {
        return `Częstoliwość losowania liczby bonusowej w ${this.todayMonthDayNumber} dniu miesiąca ${this.dateRangeLabel(dateRange)}`;
    }
}
