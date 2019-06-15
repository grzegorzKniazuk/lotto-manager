import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BASE_CHART_BAR_BACKGROUND_COLOR, BASE_CHART_BAR_BORDER_COLOR, BASE_FONT_COLOR, BASE_FONT_SIZE } from 'src/app/shared/constants';

@Component({
    selector: 'lm-date-value-chart',
    templateUrl: './date-value-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateValueChartComponent {
    @Input() public readonly numberMapArray: Map<string, number>;

    public get chartData(): Object {
        return {
            labels: Array.from(this.numberMapArray.keys()),
            datasets: [
                {
                    backgroundColor: BASE_CHART_BAR_BACKGROUND_COLOR,
                    borderColor: BASE_CHART_BAR_BORDER_COLOR,
                    data: Array.from(this.numberMapArray.values()),
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
                        labelString: 'Wynik',
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
}
