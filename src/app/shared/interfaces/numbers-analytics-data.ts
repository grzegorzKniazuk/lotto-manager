export interface NumbersAnalyticsData {
    length?: number;
    [key: number]: {
        value: number;
        percentage: number;
    };
}
