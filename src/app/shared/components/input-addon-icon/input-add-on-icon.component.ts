import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'lm-input-add-on-icon',
    templateUrl: './input-add-on-icon.component.html',
    styleUrls: [ './input-add-on-icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAddOnIconComponent implements OnInit {
    @Input() public controlName: string;
    public isControlInvalid$: Observable<boolean>;

    constructor(
        private controlContainer: ControlContainer,
    ) {
    }

    ngOnInit() {
        if (this.controlName) {
            this.watchControlErrors();
        }
    }

    private get control(): AbstractControl {
        return this.form.controls[this.controlName];
    }

    private get form(): FormGroup {
        return this.controlContainer.formDirective ? (this.controlContainer.formDirective as FormGroupDirective).form : null;
    }

    private watchControlErrors(): void {
        this.isControlInvalid$ = this.control.valueChanges.pipe(
            map(() => this.control.dirty && this.control.invalid),
        );
    }
}
