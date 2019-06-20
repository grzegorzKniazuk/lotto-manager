import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { forEach } from 'lodash';
import { ScoreNumbersExpression } from 'src/app/shared/enums';
import { GeneralStatisticsTitlesMap } from 'src/app/shared/constants';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent implements OnInit {

    public readonly scoresExpressionArray: { title: string, scoreExpression: ScoreNumbersExpression }[] = [];

    public ngOnInit(): void {
        this.buildGeneralStatisticsList();
    }

    protected buildGeneralStatisticsList(): void {
        forEach(Object.values(ScoreNumbersExpression), (scoreExpression: ScoreNumbersExpression) => {
            this.scoresExpressionArray.push({ title: GeneralStatisticsTitlesMap[scoreExpression], scoreExpression });
        });
    }
}
