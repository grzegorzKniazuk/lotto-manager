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
    private static readonly yearQuarterFormat = 'Q';
    private static readonly dayNumberOfYearFormat = 'DDD';
    private static readonly dayNumberOfMonthFormat = 'D';

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

    public get todayDayName(): string {
        return moment(this.currentDate).locale(TimeService.locale).format(TimeService.dayNameFormat);
    }

    public get todayYearDayNumber(): number {
        return +moment(this.currentDate).format(TimeService.dayNumberOfYearFormat);
    }

    public get todayMonthDayNumber(): number {
        return +moment(this.currentDate).format(TimeService.dayNumberOfMonthFormat);
    }

    public get todayMonthName(): string {
        return moment(this.currentDate).locale(TimeService.locale).format(TimeService.monthNameFormat);
    }

    public get todayYearQuarter(): number {
        return +moment(this.currentDate).format(TimeService.yearQuarterFormat);
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
        return +moment(this.currentDate).format(TimeService.monthOfYearFormat) % 2 === 0;
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

    public static isSameYearQuarter(date: string): boolean {
        return moment(date).format(TimeService.yearQuarterFormat) === moment().format(TimeService.yearQuarterFormat);
    }

    public static isSameYearDayNumber(date: string): boolean {
        return moment(date).format(TimeService.dayNumberOfYearFormat) === moment().format(TimeService.dayNumberOfYearFormat);
    }

    public static isSameMonthDayNumber(date: string): boolean {
        return moment(date).format(TimeService.dayNumberOfMonthFormat) === moment().format(TimeService.dayNumberOfMonthFormat);
    }
}
