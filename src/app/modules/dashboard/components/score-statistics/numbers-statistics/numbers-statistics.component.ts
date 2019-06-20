import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScoreNumbersFilters } from 'src/app/shared/enums';
import { forEach } from 'lodash';
import { NumbersStatisticsTitlesMap } from 'src/app/shared/constants/numbers-statistics-titles-map';

@Component({
    selector: 'lm-numbers-statistics',
    templateUrl: './numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersStatisticsComponent implements OnInit {

    public readonly scoresFilterArray: { title: string, scoreFilter: ScoreNumbersFilters }[] = [];

    public ngOnInit(): void {
        this.buildStatisticsList();
    }

    protected buildStatisticsList(): void {
        forEach(Object.values(ScoreNumbersFilters), (scoreFilter: ScoreNumbersFilters) => {
            this.scoresFilterArray.push({ title: NumbersStatisticsTitlesMap[scoreFilter], scoreFilter });
        });
    }
}
