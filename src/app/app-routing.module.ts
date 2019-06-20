import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then((module) => module.DashboardModule) },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
    }) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}
