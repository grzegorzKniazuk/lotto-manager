import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, QueryableScoreField, ScoreNumbersExpression, ScoreNumbersFilter, ScoreQueryType, SortBy } from 'src/app/shared/enums';
import { OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';
import { merge, Observable } from 'rxjs';
import { BallValuePercentageArray, DateValueArray } from 'src/app/shared/types';
import { FIRST_DRAW_DATE, SCORE_NUMBERS_INDEXES_ARRAY } from 'src/app/shared/constants';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import { ScoreService, TimeService, ToastService } from 'src/app/shared/services';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {
    @Input() public readonly title: string;

    @Input() public readonly scoreQueryType: ScoreQueryType;
    @Input() public readonly isBonusNumberAdvice = false;
    @Input() public readonly isNumberIndexAdvice = false;
    @Input() public readonly isGeneralAdvice = false;

    @Input() public readonly scoreExpression: ScoreNumbersExpression;
    @Input() public readonly scoreFilter: ScoreNumbersFilter;

    public readonly dateIndexesFilterForm: FormGroup = this.buildFilterForm;
    public readonly numberIndexButtonConfig = this.numberIndexButtonOptions;

    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public sortBy: SortBy = SortBy.VALUE;
    public readonly sortTypesButtonConfig: SelectItem[] = this.sorTypesButtonOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public readonly viewTypesButtonConfig: SelectItem[] = this.viewTypesButtonOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public readonly chartTypesButtonConfig: SelectItem[] = this.chartTypesButtonOptions;

    public numberBallValuePercentageArray$: Observable<BallValuePercentageArray>;
    public numbersDateValueArray$: Observable<DateValueArray>;

    private lastIndexesControlValue: number[];
    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;

    constructor(
        private readonly scoreService: ScoreService,
        private readonly timeService: TimeService,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
    ) {
    }

    public get isChartViewType(): boolean {
        return this.viewType === DataViewType.CHART;
    }

    public get isNumbersViewType(): boolean {
        return this.viewType === DataViewType.NUMBERS;
    }

    private get buildFilterForm(): FormGroup {
        return this.formBuilder.group({
            dateRange: [ [ new Date(FIRST_DRAW_DATE), new Date() ] ],
            indexes: [ SCORE_NUMBERS_INDEXES_ARRAY ],
        });
    }

    private get dateRangeControl(): AbstractControl {
        return this.dateIndexesFilterForm.controls['dateRange'];
    }

    private get indexesControl(): AbstractControl {
        return this.dateIndexesFilterForm.controls['indexes'];
    }

    private get numberIndexButtonOptions(): SelectItem[] {
        return [
            { label: '1', value: 0 },
            { label: '2', value: 1 },
            { label: '3', value: 2 },
            { label: '4', value: 3 },
            { label: '5', value: 4 },
        ];
    }

    private get dateRangeSelectOptions(): SelectItem[] {
        return [
            { label: 'Wszystkie losowania', value: FIRST_DRAW_DATE },
            { label: 'Ostatni rok', value: this.timeService.subtractYearFromNow },
            { label: 'Ostatni miesiąc', value: this.timeService.subtractMonthFromNow },
            { label: 'Ostatni tydzień', value: this.timeService.subtractWeekFromNow },
        ];
    }

    private get sorTypesButtonOptions(): SelectItem[] {
        return [
            { label: 'Sortuj wg. numeru', value: SortBy.NUMBER },
            { label: 'Sortuj wg. wartości', value: SortBy.VALUE },
        ];
    }

    private get viewTypesButtonOptions(): SelectItem[] {
        return [
            { label: 'Zestaw liczb', value: DataViewType.NUMBERS },
            { label: 'Wykres', value: DataViewType.CHART },
        ];
    }

    private get chartTypesButtonOptions(): SelectItem[] {
        return [
            { label: 'Wartości liczbowe', value: ChartDataType.VALUES },
            { label: 'Wartości procentowe', value: ChartDataType.PERCENTAGES },
        ];
    }

    public onOptionClick(event: OptionClickEvent): void {
        event.originalEvent.stopImmediatePropagation();
        this.accordionBottomAnchor.nativeElement.focus();
    }

    public onAccordionOpen(): void {
        if (this.scoreExpression) {
            this.numbersDateValueArray$ = this.initStream<DateValueArray>();
        } else if (this.scoreFilter) {
            this.numberBallValuePercentageArray$ = this.initStream<BallValuePercentageArray>();
        }
    }

    public onDateRangeSelectButtonChange(startDate: string): void {
        this.dateRangeControl.setValue([ new Date(startDate), new Date() ]);
    }

    private initStream<T>(): Observable<T> {
        return merge(
            this.dateRangeControl.valueChanges,
            this.indexesControl.valueChanges,
        ).pipe(
            filter(() => {
                if (!this.indexesControl.value.length) {
                    this.toastService.error('Przynajmniej jeden z indeksów musi być wybrany do obliczenia statystyk');
                    this.indexesControl.patchValue(this.lastIndexesControlValue);
                    return false;
                } else {
                    return true;
                }
            }),
            startWith([]),
            tap(() => this.lastIndexesControlValue = this.indexesControl.value),
            switchMap(() => this.switchToExpressionOrFilter<T>()),
        );
    }

    private switchToExpressionOrFilter<T>(): Observable<T> {
        return this.scoreService.scoreNumbersByQueryParams<T>({
            queryType: this.scoreQueryType,
            byField: this.isBonusNumberAdvice ? QueryableScoreField.BONUS_NUMBER : QueryableScoreField.NUMBERS,
            startDate: this.dateRangeControl.value[0],
            endDate: this.dateRangeControl.value[1],
            indexes: this.isBonusNumberAdvice ? [ 0 ] : this.indexesControl.value,
            filter: this.scoreFilter,
            expression: this.scoreExpression,
        });
    }
}

