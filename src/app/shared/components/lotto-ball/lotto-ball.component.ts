import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'lm-lotto-ball',
    templateUrl: './lotto-ball.component.html',
    styleUrls: [ './lotto-ball.component.scss' ],
})
export class LottoBallComponent {

    @Input() public number: number;
    @Input() public ballSize: string;
    @Input() public clickable: boolean;
    @Input() public ballIndex: number;
    @Input() public selectedBallIndex: number;
    @Output() public readonly onBallClick: EventEmitter<number> = new EventEmitter<number>();

    public get isSelected(): boolean {
        return this.selectedBallIndex === this.ballIndex;
    }

    public clickAction(): void {
        if (this.clickable && !this.isSelected) {
            this.onBallClick.emit(this.ballIndex);
        } else if (this.clickable && this.isSelected) {
            this.onBallClick.emit(null);
        }
    }
}
