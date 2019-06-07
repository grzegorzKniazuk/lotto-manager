export interface NumbersData {
    length: number;
    [key: string]: {
        value: number;
        percentage: number;
    } | number;
}
