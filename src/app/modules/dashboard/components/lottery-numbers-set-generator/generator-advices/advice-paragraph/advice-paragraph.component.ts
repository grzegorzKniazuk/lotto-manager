import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

    public sortBy: SortBy = SortBy.VALUE;
    public sortTypes: SelectItem[] = this.sorTypesOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public viewTypes: SelectItem[] = this.viewTypesOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public chartDataTypes: SelectItem[] = this.chartTypesOptions;

    public get sorTypesOptions(): SelectItem[] {
        return [
            { label: 'Sortuj wg. numeru', value: SortBy.NUMBER },
            { label: 'Sortuj wg. wartości', value: SortBy.VALUE },
        ];
    }

    public get viewTypesOptions(): SelectItem[] {
        return [
            { label: 'Zestaw liczb', value: DataViewType.NUMBERS },
            { label: 'Wykres', value: DataViewType.CHART },
        ];
    }

    public get chartTypesOptions(): SelectItem[] {
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
}

