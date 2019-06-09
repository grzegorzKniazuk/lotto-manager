import { Component, Input } from '@angular/core';
import { ChartDataType, DataViewType, DateRange, SortBy } from 'src/app/shared/enums';
import { NumberData, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
})
export class AdviceParagraphComponent {

    @Input() public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    @Input() public numberDataArray: NumberData[];
    @Input() public title: string;
    @Input() public todayDayName: string;
    @Input() public collapsed: boolean = true;

    public sortBy: SortBy = SortBy.VALUE;
    public sortTypes: SelectItem[] = this.sorTypesOptions;

    public viewType: DataViewType = DataViewType.NUMBERS;
    public viewTypes: SelectItem[] = this.viewTypesOptions;

    public chartDataType: ChartDataType = ChartDataType.VALUES;
    public chartDataTypes: SelectItem[] = this.chartTypesOptions;

    public get pTitle(): string {
        const message = [ this.title ];

        if (this.todayDayName) {
            message.push(this.todayDayName);
        }

        switch (this.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                message.push('dla całego okresu czasu');
                break;
            }
            case DateRange.LAST_YEAR: {
                message.push('dla ostatniego roku');
                break;
            }
            case DateRange.LAST_MONTH: {
                message.push('dla ostatniego miesiąca');
                break;
            }
            case DateRange.LAST_WEEK: {
                message.push('dla ostatniego tygodnia');
                break;
            }
        }

        return message.join(' ');
    }

    public get sorTypesOptions(): SelectItem[] {
        return [
            { label: 'Numer', value: SortBy.NUMBER },
            { label: 'Wartość', value: SortBy.VALUE },
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
            { label: 'Liczbowy', value: ChartDataType.VALUES },
            { label: 'Procentowy', value: ChartDataType.PERCENTAGES },
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
        console.log(event.originalEvent);
        console.log(event.option);
        console.log(event.index);
    }
}

