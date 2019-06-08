import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    public get currentDate(): string {
        return moment().format('YYYY-MM-DD');
    }

    public get currentTime(): string {
        return moment().format('HH:mm:ss');
    }

    public get timeToDrawLeft(): string {
        let drawTime = moment().locale('pl').clone().hour(21).minute(40).second(0);

        if (moment().isAfter(drawTime)) {
            drawTime = drawTime.add(1, 'day');
        }

        return drawTime.from(moment());
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

    public static get subtractYearFromNow(): string {
        return moment().subtract('1', 'year').format('YYYY-MM-DD');
    }

    public static get subtractMonthFromNow(): string {
        return moment().subtract('1', 'month').format('YYYY-MM-DD');
    }

    public static get subtractWeekFromNow(): string {
        return moment().subtract('1', 'week').format('YYYY-MM-DD');
    }

    public static isSameWeekDayAsToday(date: string): boolean {
        return moment(date).format('dddd') === moment().format('dddd');
    }

    public get todayDayName(): string {
        return moment(this.currentDate).locale('pl').format('dddd');
    }
}
