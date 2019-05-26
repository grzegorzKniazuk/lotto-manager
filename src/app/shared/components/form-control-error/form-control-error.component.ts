import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'lm-form-control-error',
    templateUrl: './form-control-error.component.html',
    styleUrls: [ './form-control-error.component.scss' ],
})
export class FormControlErrorComponent {
    @Input() control: AbstractControl;
}
