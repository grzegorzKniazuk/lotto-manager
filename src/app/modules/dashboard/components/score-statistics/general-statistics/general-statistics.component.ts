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
    public medianScoreNumbersByDate$: Observable<Map<string, number>>;
    public medianAbsoluteDeviationScoreNumbersByDate$: Observable<Map<string, number>>;
    public productScoreNumbersByDate$: Observable<Map<string, number>>;
    public standardDeviationScoreNumbersByDate$: Observable<Map<string, number>>;
    public multinominalCoefficientsScoreNumbersByDate$: Observable<Map<string, number>>;
    public kullbackLeiblerDivergenceScoreNumbersByDate$: Observable<Map<string, number>>;
    public greatestCommonDivisorScoreNumbersByDate$: Observable<Map<string, number>>;
    public leastCommonMultipleScoreNumbersByDate$: Observable<Map<string, number>>;
    public hypotenusScoreNumbersByDate$: Observable<Map<string, number>>;

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
        this.medianScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.MEDIAN ] }));
        this.medianAbsoluteDeviationScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.MEDIAN_ABSOLUTE_DEVIATION ] }));
        this.productScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.PRODUCT ] }));
        this.standardDeviationScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.STANDARD_DEVIATION ] }));
        this.multinominalCoefficientsScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.MULTINOMINAL_COEFFICENTS ] }));
        this.kullbackLeiblerDivergenceScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.KULLBACK_LEIBLER_DIVERGENCE ] }));
        this.greatestCommonDivisorScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.GREATEST_COMMON_DIVISOR ] }));
        this.leastCommonMultipleScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.LEAST_COMMON_MULTIPLE ] }));
        this.hypotenusScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.HYPOTENUS ] }));
    }
}
