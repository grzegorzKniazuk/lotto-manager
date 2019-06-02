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
}
