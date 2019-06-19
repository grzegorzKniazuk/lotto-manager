import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { forEach } from 'lodash';
import { ScoreNumbersExpression } from 'src/app/shared/enums';
import { GeneralStatisticsTitlesMap } from 'src/app/shared/constants';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public readonly scoresExpressionArray: { title: string, scoreExpression: ScoreNumbersExpression }[] = [];

    constructor(
        timeService: TimeService,
    ) {
        super(timeService);
    }

    public ngOnInit(): void {
        this.buildGeneralStatisticsList();
    }

    private buildGeneralStatisticsList(): void {
        forEach(Object.values(ScoreNumbersExpression), (scoreExpression: ScoreNumbersExpression) => {
            this.scoresExpressionArray.push({ title: GeneralStatisticsTitlesMap[scoreExpression], scoreExpression })
        });
    }
}
