import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScoresNumbers } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { ChartData, NumberDrawFrequencyStatistics } from 'src/app/shared/interfaces';
import { BAR_CHART_BACKGROUND_COLOR } from 'src/app/shared/constants';

@Component({
    selector: 'lm-number-draw-frequency',
    templateUrl: './number-draw-frequency.component.html',
    styleUrls: [ './number-draw-frequency.component.scss' ],
})
export class NumberDrawFrequencyComponent implements OnInit {

    private readonly scoresNumbers: number[][] = [];
    public readonly statisticsData: { [key: number]: NumberDrawFrequencyStatistics } = {};
    public chartData: ChartData;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.loadScoresNumbers();
    }

    private loadScoresNumbers(): void {
        this.store.pipe(
            select(selectScoresNumbers),
        ).subscribe((scoresNumbers: number[][]) => {
            this.scoresNumbers.push(...scoresNumbers);

            this.calculateStatisticsData();
            this.buildChartData();
        });
    }

    private calculateStatisticsData(): void {

        // ile razy dana liczba wystapila w losowaniach
        this.scoresNumbers.forEach((scoreNumbers: number[]) => {
            scoreNumbers.forEach((scoreNumber: number) => {
                if (this.statisticsData.hasOwnProperty(scoreNumber)) {
                    this.statisticsData[scoreNumber]['count'] = this.statisticsData[scoreNumber]['count'] + 1;
                } else {
                    Object.defineProperty(this.statisticsData, scoreNumber, { value: { count: 1, percentage: null }, writable: true, configurable: true, enumerable: true });
                }
            });
        });

        // procent wystepowania
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
                    label: 'Procentowa częstotliwość losowania liczby w wybranym okresie',
                    data: this.percentages,
                    backgroundColor: BAR_CHART_BACKGROUND_COLOR,
                },
            ],
        };
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
