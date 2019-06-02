import { NgModule } from '@angular/core';
import { ButtonModule, CalendarModule, ChartModule, DropdownModule, InputTextModule, MultiSelectModule, SpinnerModule, TooltipModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

const primeNGModules = [
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    CalendarModule,
    SpinnerModule,
    DropdownModule,
    MultiSelectModule,
    ChartModule,
];

@NgModule({
    imports: [
        ...primeNGModules,
    ],
    exports: [
        ...primeNGModules,
    ],
})
export class PrimeNgModule {
}
