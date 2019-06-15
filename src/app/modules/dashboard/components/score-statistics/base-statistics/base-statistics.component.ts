import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdviceTypeEnum, DateScoreFilter } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-base-statistics',
    template: 'there is no template!',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseStatisticsComponent implements OnInit {

    public adviceType: AdviceTypeEnum = AdviceTypeEnum.GENERAL;
    public dateRange: DateScoreFilter = DateScoreFilter.ENTIRE_RANGE;

    protected readonly todayDayName: string = this.timeService.todayDayName;
    protected readonly todayMonthName: string = this.timeService.todayMonthName;
    protected readonly todayYearDayNumber: number = this.timeService.todayYearDayNumber;
    protected readonly todayMonthDayNumber: number = this.timeService.todayMonthDayNumber;

    constructor(
        protected readonly timeService: TimeService,
    ) {
    }

    ngOnInit() {
    }

    public onOptionClick(): void {
        console.log(this.dateRange);
    }

    protected dateRangeLabel(dateRange: DateScoreFilter): string {
        switch (dateRange) {
            case DateScoreFilter.ENTIRE_RANGE: {
                return 'dla wszystkich losowań';
            }
            case DateScoreFilter.LAST_YEAR: {
                return 'dla losowań z ostatniego roku';
            }
            case DateScoreFilter.LAST_MONTH: {
                return 'dla losowań z ostatniego miesiąca';
            }
            case DateScoreFilter.LAST_WEEK: {
                return 'dla losowań z ostatniego tygodnia';
            }
        }
    }

    public get isEntireRangeDateRange(): boolean {
        return this.dateRange === DateScoreFilter.ENTIRE_RANGE;
    }

    public get isLastYearRangeDateRange(): boolean {
        return this.dateRange === DateScoreFilter.LAST_YEAR;
    }

    protected get oddOrEvenDayFilter(): DateScoreFilter {
        return this.timeService.isOddDayToday ? DateScoreFilter.ODD_DAY : DateScoreFilter.EVEN_DAY;
    }

    protected get oddOrEvenMonthFilter(): DateScoreFilter {
        return this.timeService.isOddMonthToday ? DateScoreFilter.ODD_MONTH : DateScoreFilter.EVEN_MONTH;
    }
}
