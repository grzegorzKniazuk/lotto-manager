import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'lodash';

@Pipe({
    name: 'toFixed',
    pure: true,
})
export class ToFixedPipe implements PipeTransform {

    transform(value: number, arg: number): string {
        return isNumber(value) ? value.toFixed(arg) : value;
    }
}
