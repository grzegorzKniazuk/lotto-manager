import { Pipe, PipeTransform } from '@angular/core';
import { NumberBallValuePercentage } from 'src/app/shared/interfaces';
import { SortBy } from 'src/app/shared/enums';
import { sortBallNumberAscending, sortValueDescending } from 'src/app/shared/utils';

@Pipe({
    name: 'numberDataArraySortBy',
    pure: true,
})
export class NumberDataArraySortByPipe implements PipeTransform {

    transform(numbersData: NumberBallValuePercentage[], sortBy: SortBy): NumberBallValuePercentage[] {
        switch (sortBy) {
            case SortBy.NUMBER: {
                return numbersData.sort(sortBallNumberAscending);
            }
            case SortBy.VALUE: {
                return numbersData.sort(sortValueDescending);
            }
            default: {
                return numbersData;
            }
        }
    }
}
