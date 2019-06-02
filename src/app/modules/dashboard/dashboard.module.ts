import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ScoreListComponent, ScoreStatisticsComponent } from 'src/app/modules/dashboard/components';
import { StoreModule } from '@ngrx/store';
import { StoreFeatureNames } from 'src/app/shared/enums';
import { scoreReducer } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
    DashboardComponent,
    ScoreListComponent,
    ScoreStatisticsComponent,
];

const modules = [
    CommonModule,
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
