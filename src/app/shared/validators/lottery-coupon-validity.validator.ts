import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isInteger } from 'lodash';

export function lotteryCouponValidity(control: AbstractControl): ValidationErrors | null {
    let error = null;

    (control.value as []).forEach((numberValue: number) => {
        if (!isInteger(numberValue)) {
            error = {
                invalidCoupon: true,
            };
        }
    });

    return error;
}
