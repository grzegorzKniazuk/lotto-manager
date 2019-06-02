import { NgModule } from '@angular/core';

import { ScoreStatisticsRoutingModule } from './score-statistics-routing.module';
import { ScoreStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/score-statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BonusNumberDrawFrequencyComponent, NumberDrawFrequencyComponent } from 'src/app/modules/dashboard/components/score-statistics/components';

const components = [
    ScoreStatisticsComponent,
    NumberDrawFrequencyComponent,
    BonusNumberDrawFrequencyComponent,
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
