import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseStatisticsComponent } from 'src/app/modules/dashboard/components/score-statistics/base-statistics/base-statistics.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { ExpressionScore } from 'src/app/shared/enums';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectNumbersByExpression } from 'src/app/modules/dashboard/store/selectors';
import { Observable } from 'rxjs';
import { DateRangeFilterWithBallIndexesArray, DateValueMap } from 'src/app/shared/types';
import { DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY } from 'src/app/shared/constants';

@Component({
    selector: 'lm-general-statistics',
    templateUrl: './general-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatisticsComponent extends BaseStatisticsComponent implements OnInit {

    public sumOfScoreNumbers$: Observable<DateValueMap>;
    public averageOfScoreNumbers$: Observable<DateValueMap>;
    public minMaxDifferenceScoreNumbers$: Observable<DateValueMap>;
    public medianScoreNumbers$: Observable<DateValueMap>;
    public medianAbsoluteDeviationScoreNumbers$: Observable<DateValueMap>;
    public productScoreNumbers$: Observable<DateValueMap>;
    public standardDeviationScoreNumbers$: Observable<DateValueMap>;
    public multinominalCoefficientsScoreNumbers$: Observable<DateValueMap>;
    public kullbackLeiblerDivergenceScoreNumbers$: Observable<DateValueMap>;
    public greatestCommonDivisorScoreNumbers$: Observable<DateValueMap>;
    public leastCommonMultipleScoreNumbers$: Observable<DateValueMap>;

    constructor(
        timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
        super(timeService);
    }

    public ngOnInit(): void {
        this.calculate();
    }

    private calculate(): void {
        this.calculateSumOfScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateAverageOfScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateMinMaxDifferenceScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateMedianScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateMedianAbsoluteDeviationScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateProductScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateStandardDeviationScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateMultinominalCoefficientsScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateKullbackLeiblerDivergenceScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateGreatestCommonDivisorScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
        this.calculateLeastCommonMultipleScoreNumbers(DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY);
    }

    public calculateSumOfScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.sumOfScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], indexes: ballIndexes, expressions: [ ExpressionScore.SUM ] }));
    }

    public calculateAverageOfScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.averageOfScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], indexes: ballIndexes, expressions: [ ExpressionScore.AVERAGE ] }));
    }

    public calculateMinMaxDifferenceScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.minMaxDifferenceScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.MIN_MAX_DIFFERENCE ],
        }));
    }

    public calculateMedianScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.medianScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], indexes: ballIndexes, expressions: [ ExpressionScore.MEDIAN ] }));
    }

    public calculateMedianAbsoluteDeviationScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.medianAbsoluteDeviationScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.MEDIAN_ABSOLUTE_DEVIATION ],
        }));
    }

    public calculateProductScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.productScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], indexes: ballIndexes, expressions: [ ExpressionScore.PRODUCT ] }));
    }

    public calculateStandardDeviationScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.standardDeviationScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, { filters: [ dateRange ], indexes: ballIndexes, expressions: [ ExpressionScore.STANDARD_DEVIATION ] }));
    }

    public calculateMultinominalCoefficientsScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.multinominalCoefficientsScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.MULTINOMINAL_COEFFICENTS ],
        }));
    }

    public calculateKullbackLeiblerDivergenceScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.kullbackLeiblerDivergenceScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.KULLBACK_LEIBLER_DIVERGENCE ],
        }));
    }

    public calculateGreatestCommonDivisorScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.greatestCommonDivisorScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.GREATEST_COMMON_DIVISOR ],
        }));
    }

    public calculateLeastCommonMultipleScoreNumbers([ dateRange, ballIndexes ]: DateRangeFilterWithBallIndexesArray): void {
        this.leastCommonMultipleScoreNumbers$ = this.store.pipe(select(selectNumbersByExpression, {
            filters: [ dateRange ],
            indexes: ballIndexes,
            expressions: [ ExpressionScore.LEAST_COMMON_MULTIPLE ],
        }));
    }
}
