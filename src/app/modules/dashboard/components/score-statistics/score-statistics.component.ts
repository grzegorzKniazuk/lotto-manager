import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimeService } from 'src/app/shared/services/time.service';
import { AdviceType } from 'src/app/shared/enums';
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
    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;

    constructor(
        timeService: TimeService,
    ) {
        super(timeService);
    }

    private get adviceTypeSelectOptions(): SelectItem[] {
        return [
            { label: 'Ogólne', value: AdviceType.GENERAL },
            { label: 'Liczby 5-35', value: AdviceType.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceType.BONUS_NUMBER },
        ];
    }
}
