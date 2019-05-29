import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ValidationErrors } from 'src/app/shared/constants';
import { BaseErrorTooltip } from 'src/app/shared/directives/base-error-tooltip';

@Directive({
    selector: '[lmFormControlErrorTooltip]',
})
export class FormControlErrorTooltipDirective extends BaseErrorTooltip implements OnInit, OnDestroy {

    @Input() public readonly formControlName: string;

    constructor(
        private controlContainer: ControlContainer,
        componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private applicationRef: ApplicationRef,
        viewContainerRef: ViewContainerRef,
    ) {
        super(viewContainerRef, componentFactoryResolver);
    }

    ngOnInit() {
        this.watchOnControlErrors();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    private get form(): FormGroup {
        return this.controlContainer.formDirective ? (this.controlContainer.formDirective as FormGroupDirective).form : null;
    }

    private get control(): AbstractControl {
        return this.form.controls[this.formControlName];
    }

    private watchOnControlErrors(): void {
        const controlStatusChanges$ = this.control.valueChanges.pipe(
            distinctUntilChanged(),
            tap(() => this.form.updateValueAndValidity()),
            tap(() => this.viewContainerRef.clear()),
            filter(() => this.control.errors !== null),
        ).subscribe(() => {
            this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
            this.componentRef.instance.inputWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this.componentRef.instance.errorText = this.errorText;
        });

        this.subscriptions.add(controlStatusChanges$);
    }

    // todo dodac nasluchiwanie na statusChanges dla calego formularza w celu odswiezania statusu wielu kontrolek

    protected get errorText(): string {
        return ValidationErrors[Object.keys(this.control.errors)[0]];
    }
}
