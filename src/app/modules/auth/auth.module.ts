import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegisterComponent } from 'src/app/modules/auth/components';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
    LoginComponent,
    RegisterComponent,
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
    ],
})
export class AuthModule {
}
