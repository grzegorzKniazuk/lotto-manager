import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScoreNumbersFilter } from 'src/app/shared/enums';
import { forEach } from 'lodash';
import { BonusNumberTitlesMap } from 'src/app/shared/constants';

@Component({
    selector: 'lm-numbers-statistics',
    templateUrl: './numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersStatisticsComponent implements OnInit {

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
