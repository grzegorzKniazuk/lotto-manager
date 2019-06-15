import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { DateScoreFilter, ExpressionScore } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectNumbersByExpression } from 'src/app/modules/dashboard/store/selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent extends BaseStatisticsComponent {

    @Input()
    public set dateRange(dateRange: DateScoreFilter) {
        this.calculate(dateRange);
    }

    public sumOfScoreNumbersByDate$: Observable<Map<string, number>>;
    public averageOfScoreNumbersByDate$: Observable<Map<string, number>>;
    public minMaxDifferenceScoreNumbersByDate$: Observable<Map<string, number>>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    private calculate(dateRange: DateScoreFilter): void {
        this.sumOfScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.SUM ] }));
        this.averageOfScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.AVERAGE ] }));
        this.minMaxDifferenceScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.MIN_MAX_DIFFERENCE ] }));
    }
}
