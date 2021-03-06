import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import {
    AdviceParagraphComponent,
    BonusNumbersStatisticsComponent,
    DateValueChartComponent,
    EkstraPensjaListComponent,
    EkstraPremiaListComponent,
    GeneralStatisticsComponent,
    LotteryNumbersSetGeneratorComponent,
    NumberDataChartComponent,
    NumbersStatisticsComponent,
    ScoreStatisticsComponent,
} from 'src/app/modules/dashboard/components';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureNames } from 'src/app/shared/enums';
import { scoreReducer } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
    DashboardComponent,
    ScoreStatisticsComponent,
    LotteryNumbersSetGeneratorComponent,
    AdviceParagraphComponent,
    NumberDataChartComponent,
    BonusNumbersStatisticsComponent,
    NumbersStatisticsComponent,
    GeneralStatisticsComponent,
    DateValueChartComponent,
    EkstraPensjaListComponent,
    EkstraPremiaListComponent,
];

const modules = [
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature(StoreFeatureNames.SCORE, scoreReducer),
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        ...modules,
    ],
})
export class DashboardModule {
}
