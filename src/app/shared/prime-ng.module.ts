import { NgModule } from '@angular/core';
import { ButtonModule, InputTextModule, TooltipModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

const primeNGModules = [
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
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
