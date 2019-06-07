import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {

    transform(value: number, arg: number): string {
        return value.toFixed(arg);
    }
}
