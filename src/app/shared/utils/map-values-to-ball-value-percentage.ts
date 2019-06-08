import { NumberData } from 'src/app/shared/interfaces';
import { percentage } from 'src/app/shared/utils/percentage';
import { mapValues } from 'lodash';

export function mapValuesToBallValuePercentage(values: { [key: string]: number }, total: number): NumberData[] {
    const resultArray = [];

    mapValues(values, (value, index) => {
        resultArray.push({
            ball: +index,
            value,
            percentage: percentage(value, total),
        });
    });

    return resultArray;
}
