import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lotteryCouponValidity } from 'src/app/shared/validators/lottery-coupon-validity.validator';

@Component({
    selector: 'lm-lottery-numbers-set-generator',
    templateUrl: './lottery-numbers-set-generator.component.html',
    styleUrls: [ './lottery-numbers-set-generator.component.scss' ],
})
export class LotteryNumbersSetGeneratorComponent implements OnInit {

    public generatorForm: FormGroup = this.form;

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    private get form(): FormGroup {
        return this.formBuilder.group({
            lotteryNumbers: [ [], [ Validators.required, lotteryCouponValidity ] ],
        });
    }

    ngOnInit() {
    }
}
