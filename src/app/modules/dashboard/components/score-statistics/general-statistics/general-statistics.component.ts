import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { DateScoreFilter } from 'src/app/shared/enums';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    styleUrls: [ './general-statistics.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    @Input()
    public set dateRange(dateRange: DateScoreFilter) {
        console.log(dateRange);
    }

    constructor(
        timeService: TimeService,
    ) {
        super(timeService);
    }

    ngOnInit() {
    }
}
