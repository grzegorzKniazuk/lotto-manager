import { Pipe, PipeTransform } from '@angular/core';
import { NumbersData } from 'src/app/shared/interfaces';
import * as R from 'ramda';

@Pipe({
    name: 'extractNumberKey',
    pure: true,
})
export class ExtractNumberKeyPipe implements PipeTransform {

    transform(data: NumbersData): NumbersData {
        return R.dissoc('length', data);
    }
}
