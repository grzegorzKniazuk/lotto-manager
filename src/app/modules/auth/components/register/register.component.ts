import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/shared/validators';

@Component({
    selector: 'lm-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm(): void {
        this.registerForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
            repeatPassword: [ '', [ Validators.required ] ],
        }, { validators: [ passwordMatchValidator() ] });
    }
}
