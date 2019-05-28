import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        const password = group.controls['password'].value;
        const repeatPassword = group.controls['repeatPassword'].value;

        if (password && repeatPassword && password !== repeatPassword) {
            return {
                passwordNotMatch: true,
            };
        } else {
            return null;
        }
    }
}
