import { ToastSeverity } from 'src/app/shared/enums';

export interface ToastOptions {
    severity: ToastSeverity;
    summary: string;
    detail: string;
    key: string;
    life: number;
    sticky: boolean;
    closable: boolean;
    data: any;
}
