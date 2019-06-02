import { TableFilterMatchModeEnum } from 'src/app/shared/enums';

export interface TableColumn {
    field: string;
    header: string;
    order?: number;
    filterMatchMode?: TableFilterMatchModeEnum;
}
