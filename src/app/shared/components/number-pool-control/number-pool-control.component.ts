import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lm-number-pool-control',
    templateUrl: './number-pool-control.component.html',
    styleUrls: [ './number-pool-control.component.scss' ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumberPoolControlComponent), multi: true },
    ],
})
export class NumberPoolControlComponent implements OnInit, ControlValueAccessor {

    @Input() public disabled = false;
    @Input() public min: number;
    @Input() public max: number;

    public readonly balls: number[] = [];
    public value: number[] = [];

    public propagateChange: any = () => {
    };

    ngOnInit() {
        this.buildBallsControls();
    }

    private buildBallsControls(): void {
        for (let i = this.min; i <= this.max; i++) {
            this.balls.push(i);
        }
    }

    public toggleBallNumber(number: number): void {
        if (this.value.includes(number)) {
            this.value.splice(this.value.indexOf(number), 1);
        } else {
            this.value.push(number);
        }

        this.propagateChange(this.value);
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(numbers: number[]): void {
        this.value.push(...numbers);
    }
}
