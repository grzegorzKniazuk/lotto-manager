import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-timer',
    templateUrl: './timer.component.html',
    styleUrls: [ './timer.component.scss' ],
})
export class TimerComponent implements OnInit, OnDestroy {

    public currentDate: string;
    public currentTime: string;
    public timeLeft: string;
    public clock: number;

    constructor(
        private timeService: TimeService,
    ) {
    }

    ngOnInit() {
        this.initDateTime();
        this.startClock();
    }

    ngOnDestroy() {
        clearInterval(this.clock);
    }

    private initDateTime(): void {
        this.currentDate = this.timeService.currentDate;
        this.currentTime = this.timeService.currentTime;
        this.timeLeft = this.timeService.timeToDrawLeft;
    }

    private startClock(): void {
        this.clock = setInterval(() => {
            this.currentDate = this.timeService.currentDate;
            this.currentTime = this.timeService.currentTime;
            this.timeLeft = this.timeService.timeToDrawLeft;
        }, 1000);
    }

}
