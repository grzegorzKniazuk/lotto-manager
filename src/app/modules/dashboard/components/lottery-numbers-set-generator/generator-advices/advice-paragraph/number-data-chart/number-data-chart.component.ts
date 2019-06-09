import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NumberData } from 'src/app/shared/interfaces';
import { values } from 'lodash';
import * as R from 'ramda';
import { mapNumberDataArrayToBallNumberArray, mapNumberDataArrayToPercentageArray, mapNumberDataArrayToValueArray } from 'src/app/shared/utils';
import { ChartDataType } from 'src/app/shared/enums';
import { BASE_CHART_BAR_BACKGROUND_COLOR, BASE_CHART_BAR_BORDER_COLOR, BASE_FONT_COLOR, BASE_FONT_SIZE } from 'src/app/shared/constants';

@Component({
    selector: 'lm-number-data-chart',
    templateUrl: './number-data-chart.component.html',
    styleUrls: [ './number-data-chart.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberDataChartComponent {

    @Input() public numberDataArray: NumberData[];
    @Input() public chartDataType: ChartDataType;

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
                    }
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
                    }
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
        return R.compose(values, mapNumberDataArrayToBallNumberArray)(this.numberDataArray);
    }

    private get valuesData(): number[] {
        return R.compose(values, mapNumberDataArrayToValueArray)(this.numberDataArray);
    }

    private get percentageData(): number[] {
        return R.compose(values, mapNumberDataArrayToPercentageArray)(this.numberDataArray);
    }
}
