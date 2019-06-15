import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, SortBy } from 'src/app/shared/enums';
import { NumberBallValuePercentage, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent implements OnInit {
    @Input() public readonly numberDataArray: NumberBallValuePercentage[] = [];
    @Input() public readonly numberMapArray: Map<string, number>;
    @Input() public readonly title: string;
    @Input() public readonly isNumberIndexAdvice = false;
    @Input() public readonly isGeneralAdvice = false;
    @Output() public readonly onSelectNumberIndexChange: EventEmitter<number> = new EventEmitter<number>();
    public numberIndexButtonConfig = this.numberIndexButtonOptions;
    public numberIndex = 0;
    public sortBy: SortBy = SortBy.VALUE;
    public sortTypesButtonConfig: SelectItem[] = this.sorTypesButtonOptions;
    public viewType: DataViewType = DataViewType.NUMBERS;
    public viewTypesButtonConfig: SelectItem[] = this.viewTypesButtonOptions;
    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public chartTypesButtonConfig: SelectItem[] = this.chartTypesButtonOptions;
    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;

    public get isChartViewType(): boolean {
        return this.viewType === DataViewType.CHART;
    }

    public get isNumbersViewType(): boolean {
        return this.viewType === DataViewType.NUMBERS;
    }

    private get sorTypesButtonOptions(): SelectItem[] {
        return [
            { label: 'Sortuj wg. numeru', value: SortBy.NUMBER },
            { label: 'Sortuj wg. wartości', value: SortBy.VALUE },
        ];
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

    ngOnInit() {
        console.log(this.numberMapArray);
    }

    public onOptionClick(event: OptionClickEvent): void {
        event.originalEvent.stopImmediatePropagation();
        this.accordionBottomAnchor.nativeElement.focus();
    }

    public sendSelectedNumberIndex(): void {
        this.onSelectNumberIndexChange.emit(this.numberIndex);
    }
}

