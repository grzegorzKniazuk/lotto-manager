import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { ScoreNumbersFilters } from 'src/app/shared/enums';
import { forEach } from 'lodash';
import { NumbersStatisticsTitlesMap } from 'src/app/shared/constants/numbers-statistics-titles-map';

@Component({
    selector: 'lm-numbers-statistics',
    templateUrl: './numbers-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public readonly scoresFilterArray: { title: string, scoreFilter: ScoreNumbersFilters }[] = [];

    constructor(
        timeService: TimeService,
    ) {
        super(timeService);
    }

    public ngOnInit(): void {
        this.buildStatisticsList();
    }

    protected buildStatisticsList(): void {
        forEach(Object.values(ScoreNumbersFilters), (scoreFilter: ScoreNumbersFilters) => {
            this.scoresFilterArray.push({ title: NumbersStatisticsTitlesMap[scoreFilter], scoreFilter });
        });
    }
}
