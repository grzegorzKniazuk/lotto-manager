import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, DateScoreFilter, ScoreExpression, SortBy } from 'src/app/shared/enums';
import { NumberBallValuePercentage, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';
import { DateRangeFilterWithBallIndexesArray } from 'src/app/shared/types';
import { ScoreService } from '../../../../../shared/services/score.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {
    @Input() public readonly numberDataArray: NumberBallValuePercentage[] = [];
    @Input() public readonly numberMapArray: Map<string, number>;
    @Input() public readonly title: string;
    @Input() public readonly isNumberIndexAdvice = false;
    @Input() public readonly isGeneralAdvice = false;
    @Input() public readonly scoreExpression: ScoreExpression;
    @Output() public readonly onSelectNumberIndexChange: EventEmitter<DateRangeFilterWithBallIndexesArray> = new EventEmitter<DateRangeFilterWithBallIndexesArray>();

    public numberIndex = [ 0, 1, 2, 3, 4 ];
    public readonly numberIndexButtonConfig = this.numberIndexButtonOptions;

    public dateRange: DateScoreFilter = DateScoreFilter.ENTIRE_RANGE;
    public readonly dateRangeTypes: SelectItem[] = this.dateRangeSelectOptions;

    public sortBy: SortBy = SortBy.VALUE;
    public readonly sortTypesButtonConfig: SelectItem[] = this.sorTypesButtonOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public readonly viewTypesButtonConfig: SelectItem[] = this.viewTypesButtonOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public readonly chartTypesButtonConfig: SelectItem[] = this.chartTypesButtonOptions;

    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;

    public numbersDateValueArray$: Observable<[string, number][]>;

    constructor(
        private readonly scoreService: ScoreService,
    ) {
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
            { label: 'Wszystkie losowania', value: DateScoreFilter.ENTIRE_RANGE },
            { label: 'Ostatni rok', value: DateScoreFilter.LAST_YEAR },
            { label: 'Ostatni miesiąc', value: DateScoreFilter.LAST_MONTH },
            { label: 'Ostatni tydzień', value: DateScoreFilter.LAST_WEEK },
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

    public sendSelectedNumberIndex(): void {
        this.onSelectNumberIndexChange.emit([ this.dateRange, this.numberIndex ]);
    }

    public onAccordionOpen(): void {
        this.numbersDateValueArray$ = this.scoreService.scoreNumbersDateValueArray({
            expression: ScoreExpression.SUM,
        });
    }
}

