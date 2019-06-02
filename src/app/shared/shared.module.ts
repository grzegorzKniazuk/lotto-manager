import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import {
    DashboardSideMenuComponent,
    FormControlErrorTooltipComponent,
    IconComponent,
    InputAddOnIconComponent,
    LottoBallComponent,
    StatisticsBarMenuComponent,
    TimerComponent,
} from 'src/app/shared/components';
import { FormControlErrorTooltipDirective, FormGroupErrorTooltipDirective } from 'src/app/shared/directives';
import { ScoreNumberPipe } from 'src/app/shared/pipes';

const entryComponents = [
    FormControlErrorTooltipComponent,
];

const components = [
    ...entryComponents,
    IconComponent,
    InputAddOnIconComponent,
    DashboardSideMenuComponent,
    LottoBallComponent,
    StatisticsBarMenuComponent,
    TimerComponent,
];

const directives = [
    FormControlErrorTooltipDirective,
    FormGroupErrorTooltipDirective,
];

const pipes = [
    ScoreNumberPipe,
];

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
