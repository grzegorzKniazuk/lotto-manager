import { ComponentFactoryResolver, Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ValidationErrors } from 'src/app/shared/constants';
import { FormControlStatus } from 'src/app/shared/enums';
import { BaseErrorTooltip } from 'src/app/shared/directives/base-error-tooltip';
import { Bind } from 'lodash-decorators';

@Directive({
    selector: '[lmFormControlErrorTooltip]',
})
export class FormControlErrorTooltipDirective extends BaseErrorTooltip implements OnInit, OnDestroy {

    @Input() public readonly formControlName: string;

    constructor(
        private controlContainer: ControlContainer,
        componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
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
        const controlStatusChanges$ = this.control.statusChanges.pipe(
            tap((status) => {
                console.log(status);
            }),
            tap(() => this.viewContainerRef.clear()),
            filter(this.isControlStatusInvalid),
        ).subscribe(() => {
            this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
            this.componentRef.instance.inputWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this.componentRef.instance.errorText = this.errorText;
        });

        this.subscriptions.add(controlStatusChanges$);
    }

    @Bind()
    private isControlStatusInvalid(status: FormControlStatus): boolean {
        return status === FormControlStatus.INVALID;
    }

    protected get errorText(): string {
        return ValidationErrors[Object.keys(this.control.errors)[0]];
    }
}
