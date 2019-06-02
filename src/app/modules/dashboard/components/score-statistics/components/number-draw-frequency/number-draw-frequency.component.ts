import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScoresNumbersByDateRange } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { ChartData, NumberDrawFrequencyStatistics, SelectButtonConfig } from 'src/app/shared/interfaces';
import { BAR_CHART_BACKGROUND_COLOR } from 'src/app/shared/constants';
import { first } from 'rxjs/operators';
import { ChartDataType } from 'src/app/shared/enums';

@Component({
    selector: 'lm-number-draw-frequency',
    templateUrl: './number-draw-frequency.component.html',
    styleUrls: [ './number-draw-frequency.component.scss' ],
})
export class NumberDrawFrequencyComponent implements OnInit {

    private scoresNumbers: number[][] = [];
    public readonly statisticsData: { [key: number]: NumberDrawFrequencyStatistics } = {};
    public dateRangeFilter: string[];
    public chartData: ChartData;
    public readonly selectButtonOptions: SelectButtonConfig[] = this.selectButtonConfigOptions;
    public selectedChartType = ChartDataType.PERCENTAGE;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.loadScoresNumbers();
    }

    private get selectButtonConfigOptions(): SelectButtonConfig[] {
        return [
            { label: 'Wykres procentowy', value: ChartDataType.PERCENTAGE },
            { label: 'Wykres liczbowy', value: ChartDataType.VALUES },
        ];
    }

    public loadScoresNumbers(): void {
        this.store.pipe(
            select(selectScoresNumbersByDateRange, { dateRange: this.dateRangeFilter }),
            first(),
        ).subscribe((scoresNumbers: number[][]) => {

            this.filterEmptyArrays(scoresNumbers);
            this.calculateStatisticsData();
            this.buildChartData();
        });
    }

    private filterEmptyArrays(scoresNumbers: number[][]): void {
        this.scoresNumbers = scoresNumbers.filter((numbers: number[]) => numbers.length);
    }

    private calculateStatisticsData(): void {
        this.resetStatisticsData();
        this.countNumbersOccurrence();
        this.countNumbersPercentageOccurrence();
    }

    private resetStatisticsData(): void {
        Object.keys(this.statisticsData).forEach((key: string) => {
            delete this.statisticsData[key];
        });
    }

    private countNumbersOccurrence(): void {
        this.scoresNumbers.forEach((scoreNumbers: number[]) => {
            scoreNumbers.forEach((scoreNumber: number) => {
                if (this.statisticsData.hasOwnProperty(scoreNumber)) {
                    this.statisticsData[scoreNumber]['count'] = this.statisticsData[scoreNumber]['count'] + 1;
                } else {
                    Object.defineProperty(this.statisticsData, scoreNumber, { value: { count: 1, percentage: null }, writable: true, configurable: true, enumerable: true });
                }
            });
        });
    }

    private countNumbersPercentageOccurrence(): void {
        for (const scoreNumberStatistic of Object.values(this.statisticsData)) {
            scoreNumberStatistic['percentage'] = (scoreNumberStatistic['count'] / this.scoresNumbers.length) * 100;
            this.percentages.push(scoreNumberStatistic['percentage']);
        }
    }

    private buildChartData(): void {
        this.chartData = {
            labels: Object.keys(this.statisticsData),
            datasets: [
                {
                    label: this.selectLabelByType,
                    data: this.selectDataByType,
                    backgroundColor: BAR_CHART_BACKGROUND_COLOR,
                },
            ],
        };
    }

    private get selectDataByType(): number[] {
        return this.selectedChartType === ChartDataType.PERCENTAGE ? this.percentages : this.numberTotalCount;
    }

    private get selectLabelByType(): string {
        return this.selectedChartType === ChartDataType.PERCENTAGE ? 'Procentowa częstotliwość losowania liczby w wybranym okresie' : 'Liczba losowań w których liczba została wylosowana';
    }

    private get percentages(): number[] {
        return Object.values(this.statisticsData).map((data: NumberDrawFrequencyStatistics) => {
            return data.percentage;
        });
    }

    private get numberTotalCount(): number[] {
        return Object.values(this.statisticsData).map((data: NumberDrawFrequencyStatistics) => {
            return data.count;
        });
    }
}
