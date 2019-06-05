import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lm-coupon-control',
    templateUrl: './coupon-control.component.html',
    styleUrls: [ './coupon-control.component.scss' ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CouponControlComponent), multi: true },
    ],
})
export class CouponControlComponent implements ControlValueAccessor {

    @Input() public disabled: boolean = false;
    @Input() public min: number = 1;
    @Input() public max: number = 35;
    @Input() public bonusMin: number = 1;
    @Input() public bonusMax: number = 4;

    public value: number[] = [];
    private numbersValue: number[] = [];
    private bonusNumberValue: number;

    public numbers: number[] = this.numbersArray;
    public bonusNumbers: number[] = this.bonusNumbersArray;

    private readonly numbersToDraw: number = 6;
    private readonly bonusNumberIndex: number = 5;

    public propagateChange: any = () => {
    };

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

    public isSelected(n: number): boolean {
        return this.numbersValue.includes(n);
    }

    public isBonusNumberSelected(bonusNumber: number): boolean {
        return this.bonusNumberValue === bonusNumber;
    }

    public selectNumber(n: number): void {
        if (!this.numbersValue.includes(n) && this.numbersValue.length < this.bonusNumberIndex) {
            this.numbersValue.push(n);
        } else if (this.numbersValue.includes(n)) {
            this.numbersValue.splice(this.numbersValue.indexOf(n), 1);
        }

        this.numbersValue = this.sortValuesAscending(this.numbersValue);
        this.value = [ ...this.numbersValue, this.bonusNumberValue ];


        this.propagateChange(this.value);
    }

    private sortValuesAscending(numbers): number[] {
        return numbers.sort((a, b) => a - b);
    }

    public selectBonusNumber(bonusNumber: number): void {
        if (this.bonusNumberValue !== bonusNumber) {
            this.bonusNumberValue = bonusNumber;
        } else {
            this.bonusNumberValue = undefined;
        }

        this.value = [ ...this.numbersValue, this.bonusNumberValue ];

        this.propagateChange(this.value);
    }

    public registerOnTouched(fn: any): void {
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public writeValue(numbers: number[]): void {
        numbers.forEach((number, index) => {
            if (index < this.numbersToDraw) {
                this.value.push(number);
            }
        });
    }
}
