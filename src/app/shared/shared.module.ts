import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { FormControlErrorTooltipComponent, IconComponent, InputAddOnIconComponent } from 'src/app/shared/components';
import { FormControlErrorTooltipDirective } from 'src/app/shared/directives';

const entryComponents = [
    FormControlErrorTooltipComponent,
];

const components = [
    ...entryComponents,
    IconComponent,
    InputAddOnIconComponent,
];

const directives = [
    FormControlErrorTooltipDirective,
];

const pipes = [];

const modules = [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
];

const providers = [];

@NgModule({
    declarations: [
        ...components,
        ...directives,
        ...pipes,
    ],
    entryComponents: [
        ...entryComponents,
    ],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
        ...components,
        ...directives,
        ...pipes,
    ],
    providers: [
        ...providers,
    ],
})
export class SharedModule {
}
