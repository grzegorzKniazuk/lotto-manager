import { Subscription } from 'rxjs';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, HostBinding, ViewContainerRef } from '@angular/core';
import { FormControlErrorTooltipComponent } from 'src/app/shared/components';

export abstract class BaseErrorTooltip {
    protected readonly subscriptions: Subscription = new Subscription();
    protected readonly componentFactory: ComponentFactory<FormControlErrorTooltipComponent> = this.componentFactoryResolver.resolveComponentFactory(FormControlErrorTooltipComponent);
    protected componentRef: ComponentRef<FormControlErrorTooltipComponent>;

    protected constructor(
        protected viewContainerRef: ViewContainerRef,
        protected componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    @HostBinding('style.position')
    public get style(): string {
        return 'relative';
    }
}
