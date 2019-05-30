import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { controlsValuesMatchValidator } from 'src/app/shared/validators';
import { FormGroupErrorTooltipConfig } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services';

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
        private userService: UserService,
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

    private onSubmit(): void {
        if (this.registerForm.valid) {
            this.userService.createUser({
                username: this.registerForm.value.username,
                password: this.registerForm.value.password,
            });
        }
    }
}
