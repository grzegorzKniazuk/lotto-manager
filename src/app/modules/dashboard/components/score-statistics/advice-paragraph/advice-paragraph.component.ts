import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, ScoreNumbersExpression, ScoreNumbersFilters, SortBy } from 'src/app/shared/enums';
import { NumberBallValuePercentage, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';
import { ScoreService } from 'src/app/shared/services/score.service';
import { merge, Observable } from 'rxjs';
import { DateValueArray } from 'src/app/shared/types';
import { FIRST_DRAW_DATE, SCORE_NUMBERS_INDEXES_ARRAY } from 'src/app/shared/constants';
import { TimeService } from 'src/app/shared/services/time.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {
    public numberDataArray: NumberBallValuePercentage[] = [];
    @Input() public readonly title: string;
    @Input() public readonly isNumberIndexAdvice = false;
    @Input() public readonly isGeneralAdvice = false;

    @Input() public readonly scoreExpression: ScoreNumbersExpression;
    @Input() public readonly scoreFilter: ScoreNumbersFilters;

    public readonly dateIndexesFilterForm: FormGroup = this.buildFilterForm;
    private lastIndexesControlValue: number[];

    public readonly numberIndexButtonConfig = this.numberIndexButtonOptions;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public sortBy: SortBy = SortBy.VALUE;
    public readonly sortTypesButtonConfig: SelectItem[] = this.sorTypesButtonOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public readonly viewTypesButtonConfig: SelectItem[] = this.viewTypesButtonOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public readonly chartTypesButtonConfig: SelectItem[] = this.chartTypesButtonOptions;

    public numbersDateValueArray$: Observable<DateValueArray>;

    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;

    constructor(
        private readonly scoreService: ScoreService,
        private readonly timeService: TimeService,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
    ) {
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

    public get isChartViewType(): boolean {
        return this.viewType === DataViewType.CHART;
    }

    public get isNumbersViewType(): boolean {
        return this.viewType === DataViewType.NUMBERS;
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
        this.numbersDateValueArray$ = merge(
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
            switchMap(() => this.scoreService.scoreNumbersDateValueArray({
                expression: this.scoreExpression,
                startDate: this.dateRangeControl.value[0],
                endDate: this.dateRangeControl.value[1],
                indexes: this.indexesControl.value,
            })),
        );
    }

    public onDateRangeSelectButtonChange(startDate: string): void {
        this.dateRangeControl.setValue([ new Date(startDate), new Date() ]);
    }
}

