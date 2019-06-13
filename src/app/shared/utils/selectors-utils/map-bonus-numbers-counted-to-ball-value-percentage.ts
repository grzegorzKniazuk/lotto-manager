import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { percentage } from 'src/app/shared/utils/percentage';
import { mapValues } from 'lodash';

export function mapBonusNumbersCountedToBallValuePercentage(values: { [key: string]: number }): (numberOfElements: number) => NumberBallValuePercentage[] {
    const resultArray = [];

    return function (numberOfElements: number): NumberBallValuePercentage[] {
        if (values) {
            mapValues(values, (value, index) => {
                resultArray.push({
                    ball: +index,
                    value,
                    percentage: percentage(value, numberOfElements),
                });
            });
        }
        return resultArray;
    };
}
