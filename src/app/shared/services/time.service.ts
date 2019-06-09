import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    private static readonly locale = 'pl';
    private static readonly dayNameFormat = 'dddd';
    private static readonly monthNameFormat = 'MMMM';
    private static readonly dayOfMonthFormat = 'D';
    private static readonly monthOfYearFormat = 'M';
    private static readonly baseDateFormat = 'YYYY-MM-DD';
    private static readonly baseTimeFormat = 'HH:mm:ss';

    public static get subtractYearFromNow(): string {
        return moment().subtract('1', 'year').format(TimeService.baseDateFormat);
    }

    public static get subtractMonthFromNow(): string {
        return moment().subtract('1', 'month').format(TimeService.baseDateFormat);
    }

    public static get subtractWeekFromNow(): string {
        return moment().subtract('1', 'week').format(TimeService.baseDateFormat);
    }

    public get currentDate(): string {
        return moment().format(TimeService.baseDateFormat);
    }

    public get currentTime(): string {
        return moment().format(TimeService.baseTimeFormat);
    }

    public get timeToDrawLeft(): string {
        let drawTime = moment().locale(TimeService.locale).clone().hour(21).minute(40).second(0);

        if (moment().isAfter(drawTime)) {
            drawTime = drawTime.add(1, 'day');
        }

        return drawTime.from(moment());
    }

    public get todayDayName(): string {
        return moment(this.currentDate).locale(TimeService.locale).format(TimeService.dayNameFormat);
    }

    public get todayMonthName(): string {
        return moment(this.currentDate).locale(TimeService.locale).format(TimeService.monthNameFormat);
    }

    public get isOddDayToday(): boolean {
        return +(moment(this.currentDate).format(TimeService.dayOfMonthFormat)) % 2 !== 0;
    }

    public get isEvenDayToday(): boolean {
        return +(moment(this.currentDate).format(TimeService.dayOfMonthFormat)) % 2 === 0;
    }

    public get isOddMonthToday(): boolean {
        return +(moment(this.currentDate).format(TimeService.monthOfYearFormat)) % 2 !== 0;
    }

    public get isEvenMonthToday(): boolean {
        return +(moment(this.currentDate).format(TimeService.monthOfYearFormat)) % 2 === 0;
    }

    public static isSameOrAfter(date: string, compareTo: string): boolean {
        return moment(date).isSameOrAfter(compareTo);
    }

    public static isSameOrBefore(date: string, compareTo: string): boolean {
        return moment(date).isSameOrBefore(compareTo);
    }

    public static isSame(date: string, compareTo: string): boolean {
        return moment(date).isSame(compareTo);
    }

    public static isSameWeekDayAsToday(date: string): boolean {
        return moment(date).format(TimeService.dayNameFormat) === moment().format(TimeService.dayNameFormat);
    }

    public static isSameMonthAsToday(date: string): boolean {
        return moment(date).format(TimeService.monthNameFormat) === moment().format(TimeService.monthNameFormat);
    }

    public static isOddDay(date: string): boolean {
        return +(moment(date).format(TimeService.dayOfMonthFormat)) % 2 !== 0;
    }

    public static isEvenDay(date: string): boolean {
        return +(moment(date).format(TimeService.dayOfMonthFormat)) % 2 === 0;
    }

    public static isOddMonth(date: string): boolean {
        return +(moment(date).format(TimeService.monthOfYearFormat)) % 2 !== 0;
    }

    public static isEvenMonth(date: string): boolean {
        return +(moment(date).format(TimeService.monthOfYearFormat)) % 2 === 0;
    }
}
