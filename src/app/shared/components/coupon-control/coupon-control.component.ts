import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lm-coupon-control',
    templateUrl: './coupon-control.component.html',
    styleUrls: [ './coupon-control.component.scss' ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CouponControlComponent), multi: true },
    ],
})
export class CouponControlComponent implements OnInit, ControlValueAccessor {

    @Input() public disabled: boolean = false;
    @Input() public min: number = 1;
    @Input() public max: number = 35;
    @Input() public bonusMin: number = 1;
    @Input() public bonusMax: number = 4;
    public value: [ number, number, number, number, number, number ];
    public numbers: number[] = this.numbersArray;
    public bonusNumbers: number[] = this.bonusNumbersArray;

    public ngOnInit(): void {

    }

    private get numbersArray(): number[] {
        return this.createNumberFilledArray(this.min, this.max);
    }

    private get bonusNumbersArray(): number[] {
        return this.createNumberFilledArray(this.bonusMin, this.bonusMax);
    }

    private createNumberFilledArray(min: number, max: number): number[] {
        return Array.from({ length: max }, (value, key) => {
            if (key + 1 >= min) {
                return key + 1;
            }
        }).filter((number) => number);
    }

    public propagateChange: any = () => {
    };

    public registerOnTouched(fn: any): void {
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(answer: any): void {
        this.value = Object.assign({}, answer);
    }
}
