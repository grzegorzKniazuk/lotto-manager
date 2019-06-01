import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, RegisterComponent } from 'src/app/modules/auth/components';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureNames } from 'src/app/shared/enums';
import { authReducer } from 'src/app/modules/auth/store/reducers/auth.reducer';

const components = [
    LoginComponent,
    RegisterComponent,
];

const modules = [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(StoreFeatureNames.AUTH, authReducer),
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        ...modules,
    ],
})
export class AuthModule {
}
