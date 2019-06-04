import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'lm-lotto-ball',
    templateUrl: './lotto-ball.component.html',
    styleUrls: [ './lotto-ball.component.scss' ],
})
export class LottoBallComponent {

    @Input() public readonly ballNumber: number;
    @Input() public readonly ballSize: string;
    @Input() public readonly clickable: boolean;
    @Input() public readonly ballIndex: number;
    @Input() public readonly selectedBallIndex: number;
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
