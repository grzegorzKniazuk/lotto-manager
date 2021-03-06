import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from 'src/app/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';
import { AuthInterceptor, HttpErrorInterceptor } from 'src/app/shared/interceptors';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgProgressModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        environment.production ? [] : [ StoreDevtoolsModule.instrument() ],
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
