import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { values } from 'lodash';
import * as R from 'ramda';
import { mapNumberDataArrayToBallNumberArray, mapNumberDataArrayToPercentageArray, mapNumberDataArrayToValueArray } from 'src/app/shared/utils';
import { ChartDataType, SortBy } from 'src/app/shared/enums';
import { BASE_CHART_BAR_BACKGROUND_COLOR, BASE_CHART_BAR_BORDER_COLOR, BASE_FONT_COLOR, BASE_FONT_SIZE } from 'src/app/shared/constants';
import { BallValuePercentageArray } from 'src/app/shared/types';

@Component({
    selector: 'lm-number-data-chart',
    templateUrl: './number-data-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberDataChartComponent {

    @Input() public readonly ballValuePercentageArray: BallValuePercentageArray;
    @Input() public readonly chartDataType: ChartDataType;
    @Input() public readonly sortBy: SortBy;

    public get chartData(): Object {
        return {
            labels: this.labels,
            datasets: [
                {
                    backgroundColor: BASE_CHART_BAR_BACKGROUND_COLOR,
                    borderColor: BASE_CHART_BAR_BORDER_COLOR,
                    data: this.dataSetsByChartDataType,
                },
            ],
        };
    }

    public get chartOptions(): Object {
        return {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [ {
                    ticks: {
                        beginAtZero: true,
                        fontSize: BASE_FONT_SIZE,
                        fontColor: BASE_FONT_COLOR,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.yAxesLabel,
                        fontSize: BASE_FONT_SIZE,
                        fontColor: BASE_FONT_COLOR,
                        fontStyle: 'bold',
                    },
                } ],
                xAxes: [ {
                    ticks: {
                        beginAtZero: true,
                        fontSize: BASE_FONT_SIZE,
                        fontColor: BASE_FONT_COLOR,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Numer',
                        fontSize: BASE_FONT_SIZE,
                        fontColor: BASE_FONT_COLOR,
                        fontStyle: 'bold',
                    },
                } ],
            },
        };
    }

    private get dataSetsByChartDataType(): number[] {
        return this.chartDataType === ChartDataType.VALUES ? this.valuesData : this.percentageData;
    }

    private get yAxesLabel(): string {
        return this.chartDataType === ChartDataType.VALUES ? 'Liczba wystąpień' : 'Procent wystąpień';
    }

    private get labels(): string[] {
        return R.compose(values, mapNumberDataArrayToBallNumberArray)(this.ballValuePercentageArray);
    }

    private get valuesData(): number[] {
        return R.compose(values, mapNumberDataArrayToValueArray)(this.ballValuePercentageArray);
    }

    private get percentageData(): number[] {
        return R.compose(values, mapNumberDataArrayToPercentageArray)(this.ballValuePercentageArray);
    }
}
