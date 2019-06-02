export interface ChartDataset {
    label?: string;
    data: number[] | object[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderSkipped?: string;
    borderWidth?: number | number[];
    hoverBackgroundColor?: string;
    hoverBorderColor?: string;
    hoverBorderWidth?: string;
    xAxisID?: string;
    yAxisID?: string;
}
