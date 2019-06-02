import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectScoresNumbers } from 'src/app/modules/dashboard/store/selectors/score.selectors';
import { NumberDrawFrequencyStatistics } from 'src/app/shared/interfaces';

@Component({
    selector: 'lm-number-draw-frequency-by-date',
    templateUrl: './number-draw-frequency.component.html',
    styleUrls: [ './number-draw-frequency.component.scss' ],
})
export class NumberDrawFrequencyComponent implements OnInit {

    private readonly scoresNumbers: number[][] = [];
    private readonly statisticsData: { [key: number]: NumberDrawFrequencyStatistics } = {};

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
        }
    }
}
