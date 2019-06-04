import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lm-lottery-numbers-set-generator',
    templateUrl: './lottery-numbers-set-generator.component.html',
    styleUrls: [ './lottery-numbers-set-generator.component.scss' ],
})
export class LotteryNumbersSetGeneratorComponent implements OnInit {

    public readonly generatedNumbersSet: number[] = [ null, null, null, null, null, null ];
    public selectedBallIndex = 0;

    constructor() {
    }

    ngOnInit() {
    }

    public onBallClick(clickedBallIndex: number): void {
        this.selectedBallIndex = clickedBallIndex;
    }
}
