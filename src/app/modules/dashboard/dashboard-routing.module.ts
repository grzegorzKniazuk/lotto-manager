import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LotteryNumbersSetGeneratorComponent, ScoreListComponent, ScoreStatisticsComponent } from 'src/app/modules/dashboard/components';
import { ScoreListResolver } from 'src/app/shared/resolvers';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, resolve: { scores: ScoreListResolver }, children: [
            { path: '', redirectTo: 'score-list', pathMatch: 'full' },
            { path: 'score-list', component: ScoreListComponent },
            { path: 'score-statistics', component: ScoreStatisticsComponent },
            { path: 'number-set-generator', component: LotteryNumbersSetGeneratorComponent },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class DashboardRoutingModule {
}
