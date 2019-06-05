import { NgModule } from '@angular/core';

import { ScoreStatisticsRoutingModule } from './score-statistics-routing.module';
import { ScoreStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/score-statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
    ScoreStatisticsComponent,
];

const modules = [
    SharedModule,
    ScoreStatisticsRoutingModule,
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        ...modules,
    ],
})
export class ScoreStatisticsModule {
}
