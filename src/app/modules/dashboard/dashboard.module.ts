import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ScoreListComponent } from 'src/app/modules/dashboard/components';

const components = [
    DashboardComponent,
    ScoreListComponent,
];

const modules = [
    CommonModule,
    DashboardRoutingModule,
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
