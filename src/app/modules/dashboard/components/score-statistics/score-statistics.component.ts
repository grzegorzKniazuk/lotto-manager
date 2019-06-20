import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdviceType } from 'src/app/shared/enums';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-score-statistics',
    templateUrl: './score-statistics.component.html',
    styleUrls: [ './score-statistics.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreStatisticsComponent {

    public adviceType: AdviceType = AdviceType.GENERAL;
    public readonly adviceTypes: SelectItem[] = this.adviceTypeSelectOptions;

    private get adviceTypeSelectOptions(): SelectItem[] {
        return [
            { label: 'Ogólne', value: AdviceType.GENERAL },
            { label: 'Liczby 5-35', value: AdviceType.NUMBERS },
            { label: 'Liczba bonusowa', value: AdviceType.BONUS_NUMBER },
        ];
    }
}
