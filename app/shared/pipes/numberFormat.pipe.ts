import { Pipe, PipeTransform } from '@angular/core';

import { MathService } from '../../shared/services/math.service';

@Pipe({name: 'numberFormat'})
export class NumberFormatPipe implements PipeTransform  {

    constructor(
        public math: MathService) {
    }

    transform(num: number): string {

        let str:string = this.math.valNum2Text(num);

        return str;
        
    }
}