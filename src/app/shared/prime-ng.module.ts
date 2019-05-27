import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule, InputTextModule, TooltipModule } from 'primeng/primeng';

const primeNGModules = [
    InputTextModule,
    ToastModule,
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
