import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    private readonly now = moment().locale('pl');

    public get currentDate(): string {
        return this.now.format('YYYY-MM-DD');
    }

    public get currentTime(): string {
        return this.now.format('HH:mm:ss');
    }

    public get timeToDrawLeft(): string {
        const drawTime = this.now.clone().hour(21).minute(40).second(0);

        return drawTime.from(this.now);
    }
}
