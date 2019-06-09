import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartDataType, DataViewType, DateRange, SortBy } from 'src/app/shared/enums';
import { NumberData, OptionClickEvent } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {

    @ViewChild('accordionBottomAnchor', { static: true }) private accordionBottomAnchor: ElementRef;
    @Input() public readonly dateRange: DateRange = DateRange.ENTIRE_RANGE;
    @Input() public readonly numberDataArray: NumberData[];
    @Input() public readonly title: string;
    @Input() public readonly todayDayName: string;
    @Input() public readonly todayMonthName: string;

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

        if (this.todayMonthName) {
            message.push(this.todayMonthName);
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

