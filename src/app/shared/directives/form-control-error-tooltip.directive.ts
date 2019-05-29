import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FormControlErrorTooltipComponent } from 'src/app/shared/components';
import { ValidationErrors } from 'src/app/shared/constants';
import { FormControlStatus } from 'src/app/shared/enums';

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
        this.watchOnFormErrors();
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
        const controlStatusChanges$ = this.control.statusChanges.pipe(
            distinctUntilChanged(),
            tap(() => this.viewContainerRef.clear()),
            filter((status: FormControlStatus) => status === FormControlStatus.INVALID),
        ).subscribe(() => {
            this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
            this.componentRef.instance.inputWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
            this.componentRef.instance.errorText = this.errorText;
        });

        this.subscriptions.add(controlStatusChanges$);
    }

    private watchOnFormErrors(): void { // TODO obsluga bledow dla walidatorow formularza
        const formStatusChanges$ = this.form.statusChanges.pipe(
        ).subscribe(() => {
        });

        this.subscriptions.add(formStatusChanges$);
    }

    private get errorText(): string {
        return ValidationErrors[Object.keys(this.control.errors)[0]];
    }
}
