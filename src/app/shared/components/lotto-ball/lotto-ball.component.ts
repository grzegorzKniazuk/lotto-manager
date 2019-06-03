import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'lm-lotto-ball',
    templateUrl: './lotto-ball.component.html',
    styleUrls: [ './lotto-ball.component.scss' ],
})
export class LottoBallComponent {
    @Input() public value: number;
    @Input() public ballSize: string;
    @Input() public clickable: boolean;

    @HostBinding('style.cursor')
    public get style(): string {
        return this.clickable ? 'pointer' : 'default';
    }

    public clickAction(): void {
        if (this.clickable) {

        }
    }
}
