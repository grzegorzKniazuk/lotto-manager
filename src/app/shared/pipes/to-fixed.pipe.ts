import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFixed',
    pure: true,
})
export class ToFixedPipe implements PipeTransform {

    transform(value: number, arg: number): string {
        return value.toFixed(arg);
    }
}
