import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services';

@Component({
    selector: 'lm-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: AuthService,
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

    private onLogin(): void {
        if (this.loginForm.valid) {
            this.userService.login(this.loginForm.value);
        }
    }
}
