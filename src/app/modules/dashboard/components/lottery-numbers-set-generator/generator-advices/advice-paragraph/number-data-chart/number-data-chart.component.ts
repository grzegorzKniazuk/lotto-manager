import { Component, Input, OnInit } from '@angular/core';
import { NumberData } from 'src/app/shared/interfaces';
import { values } from 'lodash';
import * as R from 'ramda';
import { mapNumberDataArrayToBallNumberArray, mapNumberDataArrayToPercentageArray, mapNumberDataArrayToValueArray } from 'src/app/shared/utils';
import { ChartDataType } from 'src/app/shared/enums';

@Component({
    selector: 'lm-number-data-chart',
    templateUrl: './number-data-chart.component.html',
    styleUrls: [ './number-data-chart.component.scss' ],
})
export class NumberDataChartComponent implements OnInit {

    @Input() public numberDataArray: NumberData[];
    @Input() public chartDataType: ChartDataType;

    constructor() {
    }

    ngOnInit() {

    }

    public get chartData(): any {
        return {
            labels: this.labels,
            datasets: [
                {
                    label: 'Liczbowo',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: this.dataSetsByChartDataType,
                },
            ],
        };
    }

    private get dataSetsByChartDataType(): number[] {
        return this.chartDataType === ChartDataType.VALUES ? this.valuesData : this.percentageData;
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
