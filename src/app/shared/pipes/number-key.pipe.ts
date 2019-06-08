import { Pipe, PipeTransform } from '@angular/core';
import { NumberData } from 'src/app/shared/interfaces';
import * as R from 'ramda';

@Pipe({
    name: 'extractNumberKey',
    pure: true,
})
export class ExtractNumberKeyPipe implements PipeTransform {

    transform(data: NumberData): NumberData {
        return R.dissoc('length', data);
    }
}
