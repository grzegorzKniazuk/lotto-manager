import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/score-statistics.component';

const routes: Routes = [
    {
        path: '', component: ScoreStatisticsComponent, children: [
            { path: '', redirectTo: 'ballNumber-draw-frequency', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class ScoreStatisticsRoutingModule {
}
