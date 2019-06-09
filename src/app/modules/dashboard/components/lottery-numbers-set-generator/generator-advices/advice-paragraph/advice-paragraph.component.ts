import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DateRange, SortBy } from 'src/app/shared/enums';
import { NumberData } from 'src/app/shared/interfaces';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {

    @Input() public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    @Input() public numberDataArray: NumberData[];
    @Input() public title: string;
    @Input() public todayDayName: string;
    @Input() public collapsed: boolean = true;
    @Input() public sortBy: SortBy = SortBy.VALUE;
    public sortTypes = this.sorTypesOptions;

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
}

