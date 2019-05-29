import { ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupErrorTooltipConfig } from 'src/app/shared/interfaces';
import { isArray, isEmpty } from 'lodash';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FormControlStatus } from 'src/app/shared/enums';
import { BaseErrorTooltip } from 'src/app/shared/directives/base-error-tooltip';

@Directive({
    selector: '[lmFormGroupErrorTooltip]',
})
export class FormGroupErrorTooltipDirective extends BaseErrorTooltip implements OnInit, OnDestroy {

    @Input() public readonly formGroup: FormGroup;
    @Input() public readonly formGroupErrorTooltipConfig: FormGroupErrorTooltipConfig | FormGroupErrorTooltipConfig[];

    constructor(
        viewContainerRef: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver,
    ) {
        super(viewContainerRef, componentFactoryResolver);
    }

    ngOnInit() {
        this.initWatchers();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    private initWatchers(): void {
        if (isArray(this.formGroupErrorTooltipConfig)) {
            this.buildWatchers();
        } else {
            this.buildWatcher(this.formGroupErrorTooltipConfig);
        }
    }

    private buildWatchers(): void {
        (this.formGroupErrorTooltipConfig as Array<FormGroupErrorTooltipConfig>).forEach((config) => {
            this.buildWatcher(config);
        });
    }

    private buildWatcher(config: FormGroupErrorTooltipConfig): void {
        const watcher = this.formGroup.statusChanges.pipe(
            tap(() => {
                for (const key in this.formGroup.controls) {
                    if (this.formGroup.controls[key].hasError(config.formGroupErrorName) && !this.formGroup.hasError(config.formGroupErrorName)) {
                        delete this.formGroup.controls[key].errors[config.formGroupErrorName];

                        if (isEmpty(this.formGroup.controls[key].errors)) {
                            this.formGroup.controls[key].setErrors(null);
                            this.formGroup.controls[key].updateValueAndValidity();
                        }
                    }
                }
            }),
            filter((status: FormControlStatus) => status === FormControlStatus.INVALID && this.formGroup.hasError(config.formGroupErrorName)),
        ).subscribe(() => {
            for (const key in this.formGroup.controls) {
                if (config.addictedFormGroupControlsNames.includes(key)) {
                    this.formGroup.controls[key].setErrors({ passwordNotMatch: true }, { emitEvent: false });
                }
            }
        });

        this.subscriptions.add(watcher);
    }
}
