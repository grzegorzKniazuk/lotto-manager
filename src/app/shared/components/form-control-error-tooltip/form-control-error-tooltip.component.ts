import { Component, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'lm-form-control-error-tooltip',
    templateUrl: './form-control-error-tooltip.component.html',
    styleUrls: [ './form-control-error-tooltip.component.scss' ],
})
export class FormControlErrorTooltipComponent {

    public inputWidth: number;
    public errorText: string;

    constructor(
        private domSanitizer: DomSanitizer,
    ) {
    }

    @HostBinding('style')
    public get style(): SafeStyle {
        return this.domSanitizer.bypassSecurityTrustStyle(`left: ${60 + this.inputWidth}px; top: 0; position: absolute;`);
    }
}
