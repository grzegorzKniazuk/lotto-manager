import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function controlsValuesMatchValidator(...controlsNames: string[]): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {

        let error = null;

        if (isExpectedControlsDirty(group, controlsNames)) {
            controlsNames.forEach((controlName: string) => {
                for (const key in group.controls) {
                    if (error) {
                        break;
                    } else if (formControlValuesIdentity(key, controlName, controlsNames, group)) {
                        error = {
                            passwordNotMatch: true,
                        };
                    }
                }
            });
        }

        return error;
    }
}

function isExpectedControlsDirty(group: FormGroup, controlsNames: string[]): boolean {
    return controlsNames.every((controlName: string) => {
        return group.controls[controlName].dirty;
    });
}

function formControlValuesIdentity(key: string, controlName: string, controlsNames: string[], group: FormGroup): boolean {
    return controlsNames.includes(key) && group.controls[controlName].value !== group.controls[key].value;
}
