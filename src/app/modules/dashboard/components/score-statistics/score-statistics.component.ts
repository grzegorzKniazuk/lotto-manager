import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimeService } from 'src/app/shared/services/time.service';
import { AdviceType, DateScoreFilter } from 'src/app/shared/enums';
import { SelectItem } from 'primeng/api';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';

@Component({
    selector: 'lm-score-statistics',
    templateUrl: './score-statistics.component.html',
    styleUrls: [ './score-statistics.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreStatisticsComponent extends BaseStatisticsComponent {

    public adviceType: AdviceType = AdviceType.GENERAL;
    public dateRange: DateScoreFilter = DateScoreFilter.ENTIRE_RANGE;

    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    constructor(
        timeService: TimeService,
    ) {
        super(timeService);
    }

    private get dateRangeSelectOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: DateScoreFilter.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateScoreFilter.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateScoreFilter.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateScoreFilter.LAST_WEEK },
        ];
    }

    private get adviceTypeSelectOptions(): SelectItem[] {
        return [
            { label: 'Ogólne', value: AdviceType.GENERAL },
            { label: 'Liczby 5-35', value: AdviceType.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceType.BONUS_NUMBER },
        ];
    }
}
