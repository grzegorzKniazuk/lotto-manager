import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FormControlErrorTooltipComponent } from 'src/app/shared/components';
import { ValidationErrorsEnum } from 'src/app/shared/enums';

@Directive({
    selector: '[lmFormControlErrorTooltip]',
})
export class FormControlErrorTooltipDirective implements OnInit, OnDestroy {

    @Input() public formControlName: string;
    private subscriptions: Subscription = new Subscription();
    private componentFactory: ComponentFactory<FormControlErrorTooltipComponent> = this.componentFactoryResolver.resolveComponentFactory(FormControlErrorTooltipComponent);
    private componentRef: ComponentRef<FormControlErrorTooltipComponent>;

    constructor(
        private controlContainer: ControlContainer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
    ) {
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

    @HostBinding('style.position')
    public get style(): string {
        return 'relative';
    }

    private watchOnControlErrors(): void {
        const controlValue$ = this.form.valueChanges.pipe(
            tap(() => this.viewContainerRef.clear()),
            filter(() => this.control.dirty && this.control.invalid),
        ).subscribe(() => {
            this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
            this.componentRef.instance.inputWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this.componentRef.instance.errorText = this.errorText;
        });

        this.subscriptions.add(controlValue$);
    }

    private get errorText(): string {
        switch (Object.keys(this.control.errors)[0]) {
            case ValidationErrorsEnum.REQUIRED: {
                return 'To pole jest wymagane';
            }
        }
    }
}
