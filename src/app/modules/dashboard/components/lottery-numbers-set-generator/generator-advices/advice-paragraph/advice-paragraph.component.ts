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
    @Input() public pTitle: string;
    @Input() public todayDayName: string;

    public value(data: { value: number, percentage: number } | number): number {
        return data.hasOwnProperty('value') ? (data as { value: number }).value : data as number;
    }

    public percentage(data: { value: number, percentage: number } | number): number {
        return data.hasOwnProperty('percentage') ? (data as { percentage: number }).percentage : data as number;
    }
}
