import { SelectItem } from 'primeng/api';

export interface OptionClickEvent {
    originalEvent: MouseEvent;
    option: SelectItem;
    index: number;
}
