import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lotteryCouponValidity } from 'src/app/shared/validators/lottery-coupon-validity.validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { TimeService } from 'src/app/shared/services/time.service';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { forEach, forIn, sortBy } from 'lodash';
import { Bind } from 'lodash-decorators';

@Component({
    selector: 'lm-lottery-numbers-set-generator',
    templateUrl: './lottery-numbers-set-generator.component.html',
    styleUrls: [ './lottery-numbers-set-generator.component.scss' ],
})
export class LotteryNumbersSetGeneratorComponent implements OnInit {

    public generatorForm: FormGroup = this.form;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store<AppState>,
        private readonly timeService: TimeService,
    ) {
    }

    private get form(): FormGroup {
        return this.formBuilder.group({
            lotteryNumbers: [ [], [ Validators.required, lotteryCouponValidity ] ],
        });
    }

    ngOnInit() {
    }

    @Bind
    private calculateNumberDrawFrequency(data: Partial<NumberBallValuePercentage>[]): void {
        const results = {};

        forEach(data, (numberData: Partial<NumberBallValuePercentage>) => {
            if (results.hasOwnProperty(numberData.ball)) {
                results[numberData.ball] = results[numberData.ball] + numberData.value;
            } else {
                Object.defineProperty(results, numberData.ball, { value: numberData.value, enumerable: true, configurable: true, writable: true });
            }
        });

        console.log(this.sortObjectByValue(results));
    }

    private sortObjectByValue(obj: { [key: number]: number }): { [key: number]: number }[] {
        let objArray = [];

        forIn(obj, (value, key) => {
            objArray.push({ key, value });
        });

        objArray = sortBy(objArray, [ 'value' ], [ 'desc' ]);

        return objArray;
    }
}
