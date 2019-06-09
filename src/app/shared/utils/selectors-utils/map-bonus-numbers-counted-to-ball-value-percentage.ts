import { NumberData } from 'src/app/shared/interfaces';
import { percentage } from 'src/app/shared/utils/percentage';
import { mapValues } from 'lodash';

export function mapBonusNumbersCountedToBallValuePercentage(values: { [key: string]: number }): (total: number) => NumberData[] {
    const resultArray = [];

    return function (total: number): NumberData[] {
        if (values) {
            mapValues(values, (value, index) => {
                resultArray.push({
                    ball: +index,
                    value,
                    percentage: percentage(value, total),
                });
            });
        }
        return resultArray;
    };
}
