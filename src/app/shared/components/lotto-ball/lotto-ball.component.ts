import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'lm-lotto-ball',
    templateUrl: './lotto-ball.component.html',
    styleUrls: [ './lotto-ball.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottoBallComponent implements OnInit {

    @Input() public value: number;

    constructor() {
    }

    ngOnInit() {
    }

}
