import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'lm-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    public get usernameControl(): AbstractControl {
        return this.loginForm.controls['username'];
    }

    public get passwordControl(): AbstractControl {
        return this.loginForm.controls['password'];
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
