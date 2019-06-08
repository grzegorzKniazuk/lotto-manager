import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DateRange } from 'src/app/shared/enums';
import { NumbersData } from 'src/app/shared/interfaces';

@Component({
    selector: 'lm-advice-paragraph',
    templateUrl: './advice-paragraph.component.html',
    styleUrls: [ './advice-paragraph.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceParagraphComponent {

    @Input() public dateRange: DateRange = DateRange.ENTIRE_RANGE;
    @Input() public pData: NumbersData;
    @Input() public title: string;
    @Input() public todayDayName: string;

    public value(data: { value: number, percentage: number } | number): number {
        return data.hasOwnProperty('value') ? (data as { value: number }).value : data as number;
    }

    public percentage(data: { value: number, percentage: number } | number): number {
        return data.hasOwnProperty('percentage') ? (data as { percentage: number }).percentage : data as number;
    }

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
}

