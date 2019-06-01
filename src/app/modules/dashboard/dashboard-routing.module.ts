import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ScoreListComponent } from 'src/app/modules/dashboard/components';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [ AuthGuard ], children: [
            { path: '', redirectTo: 'score-list', pathMatch: 'full' },
            { path: 'score-list', component: ScoreListComponent },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class DashboardRoutingModule {
}
