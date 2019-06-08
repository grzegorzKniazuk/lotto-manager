import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scoreNumber',
    pure: true,
})
export class ScoreNumberPipe implements PipeTransform {

    transform(value: number): string {
        if (value && value < 10) {
            return `0${value}`;
        } else if (value) {
            return `${value}`;
        } else {
            return '??';
        }
    }
}
