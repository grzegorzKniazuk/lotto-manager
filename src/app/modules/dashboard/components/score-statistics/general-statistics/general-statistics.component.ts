import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { DateScoreFilter, ExpressionScore } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectNumbersByExpression } from 'src/app/modules/dashboard/store/selectors';
import { Observable } from 'rxjs';
import { DateValueMap } from 'src/app/shared/types';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent extends BaseStatisticsComponent {

    @Input()
    public set dateRange(dateRange: DateScoreFilter) {
        this.clearMaps();
        this.calculate(dateRange);
    }

    public sumOfScoreNumbersByDate$: Observable<DateValueMap>;
    public averageOfScoreNumbersByDate$: Observable<DateValueMap>;
    public minMaxDifferenceScoreNumbersByDate$: Observable<DateValueMap>;
    public medianScoreNumbersByDate$: Observable<DateValueMap>;
    public medianAbsoluteDeviationScoreNumbersByDate$: Observable<DateValueMap>;
    public productScoreNumbersByDate$: Observable<DateValueMap>;
    public standardDeviationScoreNumbersByDate$: Observable<DateValueMap>;
    public multinominalCoefficientsScoreNumbersByDate$: Observable<DateValueMap>;
    public kullbackLeiblerDivergenceScoreNumbersByDate$: Observable<DateValueMap>;
    public greatestCommonDivisorScoreNumbersByDate$: Observable<DateValueMap>;
    public leastCommonMultipleScoreNumbersByDate$: Observable<DateValueMap>;

    // pierwsza i druga liczba zestawu
    public sumOfScoreNumbersOnIndexByDateObservablesMap: Map<number, Observable<DateValueMap>> = new Map<number, Observable<DateValueMap>>();
    public averageOfScoreNumbersOnIndexByDateObservablesMap: Map<number, Observable<DateValueMap>> = new Map<number, Observable<DateValueMap>>();
    public minMaxDifferenceScoreNumbersByDateObservablesMap: Map<number, Observable<DateValueMap>> = new Map<number, Observable<DateValueMap>>();


    public leastCommonMultipleScoreNumbersByDateObservablesMap: Map<number, Observable<DateValueMap>> = new Map<number, Observable<DateValueMap>>();

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    private clearMaps(): void {
        this.sumOfScoreNumbersOnIndexByDateObservablesMap.clear();
        this.averageOfScoreNumbersOnIndexByDateObservablesMap.clear();
        this.minMaxDifferenceScoreNumbersByDateObservablesMap.clear();
        this.leastCommonMultipleScoreNumbersByDateObservablesMap.clear();
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
        this.kullbackLeiblerDivergenceScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            expressions: [ ExpressionScore.KULLBACK_LEIBLER_DIVERGENCE ],
        }));
        this.greatestCommonDivisorScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.GREATEST_COMMON_DIVISOR ] }));
        this.leastCommonMultipleScoreNumbersByDate$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], expressions: [ ExpressionScore.LEAST_COMMON_MULTIPLE ] }));

        for (let i = 0; i < 4; i++) {
            this.sumOfScoreNumbersOnIndexByDateObservablesMap.set(
                i,
                this.store.pipe(select(selectNumbersByExpression, {
                    filters: [ dateRange ],
                    expressions: [ ExpressionScore.SUM ],
                    indexes: [ i, i + 1 ],
                })));
            this.averageOfScoreNumbersOnIndexByDateObservablesMap.set(
                i,
                this.store.pipe(select(selectNumbersByExpression, {
                    filters: [ dateRange ],
                    expressions: [ ExpressionScore.AVERAGE ],
                    indexes: [ i, i + 1 ],
                })));
            this.minMaxDifferenceScoreNumbersByDateObservablesMap.set(
                i,
                this.store.pipe(select(selectNumbersByExpression, {
                    filters: [ dateRange ],
                    expressions: [ ExpressionScore.MIN_MAX_DIFFERENCE ],
                    indexes: [ i, i + 1 ],
                })));



            this.leastCommonMultipleScoreNumbersByDateObservablesMap.set(
                i,
                this.store.pipe(select(selectNumbersByExpression, {
                    filters: [ dateRange ],
                    expressions: [ ExpressionScore.LEAST_COMMON_MULTIPLE ],
                    indexes: [ i, i + 1 ],
                })));
        }
    }
}
