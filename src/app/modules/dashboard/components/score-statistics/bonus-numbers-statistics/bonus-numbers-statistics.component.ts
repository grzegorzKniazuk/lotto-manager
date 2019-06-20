import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScoreNumbersFilter } from 'src/app/shared/enums';
import { BonusNumberTitlesMap } from 'src/app/shared/constants';
import { forEach } from 'lodash';

@Component({
    selector: 'lm-bonus-numbers-statistics',
    templateUrl: './bonus-numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonusNumbersStatisticsComponent implements OnInit {

    public readonly scoresFilterArray: { title: string, scoreFilter: ScoreNumbersFilter }[] = [];

    public ngOnInit(): void {
        this.buildStatisticsList();
    }

    protected buildStatisticsList(): void {
        forEach(Object.values(ScoreNumbersFilter), (scoreFilter: ScoreNumbersFilter) => {
            this.scoresFilterArray.push({ title: BonusNumberTitlesMap[scoreFilter], scoreFilter });
        });
    }
}
