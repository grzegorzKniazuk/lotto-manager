import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberDrawFrequencyComponent } from 'src/app/modules/dashboard/components/score-statistics/components';
import { ScoreStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/score-statistics.component';

const routes: Routes = [
    {
        path: '', component: ScoreStatisticsComponent, children: [
            { path: '', redirectTo: 'ballNumber-draw-frequency', pathMatch: 'full' },
            { path: 'ballNumber-draw-frequency', component: NumberDrawFrequencyComponent },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class ScoreStatisticsRoutingModule {
}
