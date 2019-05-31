import { NgModule } from '@angular/core';
import { ButtonModule, InputTextModule, TooltipModule } from 'primeng/primeng';

const primeNGModules = [
    InputTextModule,
    ButtonModule,
    TooltipModule,
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
