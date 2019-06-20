import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateScoreFilter } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
    selector: 'lm-base-statistics',
    template: 'there is no template!',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseStatisticsComponent {

    constructor(
        protected readonly timeService: TimeService,
    ) {
    }

    protected get oddOrEvenDayFilter(): DateScoreFilter {
        return this.timeService.isOddDayToday ? DateScoreFilter.ODD_DAY : DateScoreFilter.EVEN_DAY;
    }

    protected get oddOrEvenMonthFilter(): DateScoreFilter {
        return this.timeService.isOddMonthToday ? DateScoreFilter.ODD_MONTH : DateScoreFilter.EVEN_MONTH;
    }
}
