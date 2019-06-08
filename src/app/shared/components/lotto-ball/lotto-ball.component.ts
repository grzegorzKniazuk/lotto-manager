import { Component, Input } from '@angular/core';

@Component({
    selector: 'lm-lotto-ball',
    templateUrl: './lotto-ball.component.html',
    styleUrls: [ './lotto-ball.component.scss' ],
})
export class LottoBallComponent {

    @Input() public readonly ballNumber: number | string;
    @Input() public readonly ballSize: string;
}
