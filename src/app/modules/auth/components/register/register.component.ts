import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { controlsValuesMatchValidator } from 'src/app/shared/validators';
import { FormGroupErrorTooltipConfig } from 'src/app/shared/interfaces';

@Component({
    selector: 'lm-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ],
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    public formGroupErrorTooltipConfig: FormGroupErrorTooltipConfig[] = [];

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
        this.buildFormGroupValidationRules();
    }

    private buildForm(): void {
        this.registerForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
            repeatPassword: [ '', [ Validators.required ] ],
        }, { validators: [ controlsValuesMatchValidator('password', 'repeatPassword') ] });
    }

    private buildFormGroupValidationRules(): void {
        this.formGroupErrorTooltipConfig.push({
                formGroupErrorName: 'passwordNotMatch',
                addictedFormGroupControlsNames: [ 'password', 'repeatPassword' ],
            },
        );
    }
}
