import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, SortBy } from 'src/app/shared/enums';
import { NumberData, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
})
export class AdviceParagraphComponent {

    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;
    @Input() public readonly numberDataArray: NumberData[] = [];
    @Input() public readonly title: string;

    @Output() public onSelectNumberIndexChange: EventEmitter<number> = new EventEmitter<number>();
    @Input() public isNumberIndexAdvice = false;
    public numberIndexButtonConfig = this.numberIndexButtonOptions;
    public numberIndex = 1;

    public sortBy: SortBy = SortBy.VALUE;
    public sortTypesButtonConfig: SelectItem[] = this.sorTypesButtonOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public viewTypesButtonConfig: SelectItem[] = this.viewTypesButtonOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public chartTypesButtonConfig: SelectItem[] = this.chartTypesButtonOptions;

    private get sorTypesButtonOptions(): SelectItem[] {
        return [
            { label: 'Sortuj wg. numeru', value: SortBy.NUMBER },
            { label: 'Sortuj wg. wartości', value: SortBy.VALUE },
        ];
    }

    private get numberIndexButtonOptions(): SelectItem[] {
        return [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
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

    public get isChartViewType(): boolean {
        return this.viewType === DataViewType.CHART;
    }

    public get isNumbersViewType(): boolean {
        return this.viewType === DataViewType.NUMBERS;
    }

    public onOptionClick(event: OptionClickEvent): void {
        event.originalEvent.stopImmediatePropagation();
        this.accordionBottomAnchor.nativeElement.focus();
    }

    public sendSelectedNumberIndex(): void {
       this.onSelectNumberIndexChange.emit(this.numberIndex);
    }
}

