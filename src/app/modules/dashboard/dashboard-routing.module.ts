import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LotteryNumbersSetGeneratorComponent, ScoreListComponent } from 'src/app/modules/dashboard/components';
import { ScoreListResolver } from 'src/app/shared/resolvers';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, resolve: { scores: ScoreListResolver }, children: [
            { path: '', redirectTo: 'score-list', pathMatch: 'full' },
            { path: 'score-list', component: ScoreListComponent },
            { path: 'score-statistics', loadChildren: () => import('./components/score-statistics/score-statistics.module').then((module) => module.ScoreStatisticsModule) },
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
