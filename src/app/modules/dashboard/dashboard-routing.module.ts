import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { EkstraPensjaListComponent, EkstraPremiaListComponent, LotteryNumbersSetGeneratorComponent, ScoreStatisticsComponent } from 'src/app/modules/dashboard/components';
import { EkstraPensjaListResolver } from 'src/app/shared/resolvers';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', redirectTo: 'score-list', pathMatch: 'full' },
            { path: 'ekstra-pensja-list', resolve: { scores: EkstraPensjaListResolver }, component: EkstraPensjaListComponent },
            { path: 'ekstra-premia-list', component: EkstraPremiaListComponent },
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
