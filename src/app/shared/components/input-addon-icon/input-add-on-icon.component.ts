import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControlStatus } from 'src/app/shared/enums';

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
        private readonly controlContainer: ControlContainer,
    ) {
    }

    private get control(): AbstractControl {
        return this.form.controls[this.controlName];
    }

    private get form(): FormGroup {
        return this.controlContainer.formDirective ? (this.controlContainer.formDirective as FormGroupDirective).form : null;
    }

    ngOnInit() {
        if (this.controlName) {
            this.watchControlErrors();
        }
    }

    private watchControlErrors(): void {
        this.isControlInvalid$ = this.control.statusChanges.pipe(
            map((status: FormControlStatus) => status === FormControlStatus.INVALID),
        );
    }
}
