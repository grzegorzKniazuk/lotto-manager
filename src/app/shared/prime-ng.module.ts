import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule, InputTextModule } from 'primeng/primeng';

const primeNGModules = [
    InputTextModule,
    ToastModule,
    ButtonModule,
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
