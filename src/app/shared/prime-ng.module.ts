import { NgModule } from '@angular/core';
import { AccordionModule, ButtonModule, CalendarModule, ChartModule, DropdownModule, InputTextModule, MultiSelectModule, SelectButtonModule, SpinnerModule, TooltipModule } from 'primeng/primeng';
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
    SelectButtonModule,
    AccordionModule,
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
