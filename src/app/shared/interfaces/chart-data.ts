import { ChartDataset } from 'src/app/shared/interfaces/chart-dataset';

export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}
