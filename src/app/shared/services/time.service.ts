import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    private static readonly locale = 'pl';
    private static readonly dayNameFormat = 'dddd';
    private static readonly monthNameFormat = 'MMMM';
    private static readonly baseDateFormat = 'YYYY-MM-DD';
    private static readonly baseTimeFormat = 'HH:mm:ss';
    private static readonly yearQuarterFormat = 'Q';
    private static readonly dayNumberOfYearFormat = 'DDD';
    private static readonly dayNumberOfMonthFormat = 'D';

    public static get todayDayName(): string {
        return moment(TimeService.currentDate).locale(TimeService.locale).format(TimeService.dayNameFormat);
    }

    public static get todayMonthName(): string {
        return moment(this.currentDate).locale(TimeService.locale).format(TimeService.monthNameFormat);
    }

    public static get currentDate(): string {
        return moment().format(TimeService.baseDateFormat);
    }

    public static get todayYearQuarter(): number {
        return +moment(this.currentDate).format(TimeService.yearQuarterFormat);
    }

    public static get todayYearDayNumber(): number {
        return +moment(this.currentDate).format(TimeService.dayNumberOfYearFormat);
    }

    public static get todayMonthDayNumber(): number {
        return +moment(this.currentDate).format(TimeService.dayNumberOfMonthFormat);
    }

    public get currentDate(): string {
        return moment().format(TimeService.baseDateFormat);
    }

    public get currentTime(): string {
        return moment().format(TimeService.baseTimeFormat);
    }

    public get subtractYearFromNow(): string {
        return moment().subtract('1', 'year').format(TimeService.baseDateFormat);
    }

    public get subtractMonthFromNow(): string {
        return moment().subtract('1', 'month').format(TimeService.baseDateFormat);
    }

    public get subtractWeekFromNow(): string {
        return moment().subtract('1', 'week').format(TimeService.baseDateFormat);
    }

    public get timeToDrawLeft(): string {
        let drawTime = moment().locale(TimeService.locale).clone().hour(21).minute(40).second(0);

        if (moment().isAfter(drawTime)) {
            drawTime = drawTime.add(1, 'day');
        }

        return drawTime.from(moment());
    }
}
