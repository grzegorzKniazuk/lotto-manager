import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'lm-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
        });
    }
}
