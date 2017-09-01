import { Injectable } from '@angular/core';

@Injectable()
export class MathService {

    dtStr2Dat(str: string): Date {

        try {

            str = str.trim();

            if (str == '') return null;
            
            let arr = str.split('/');
            let dt: Date = new Date(Number(arr[2]), Number(arr[1])-1, Number(arr[0]));
            
            return dt;

        } catch (Error) {
            return Error;
        }
    }

    dtDif(dt1: Date, dt2: Date): number {

        let dif: number = ( dt2.getTime() - dt1.getTime() ) / 86400000;
        
        return dif;
    }

    valNum2Text(num: number): string {

        let neg: boolean = false;
        let str: string = '';

        if (num == null) return '';
        if (num == 0) return '0,00';
        if (num < 0) {
            neg = true;
            num = -num;
        } 
        
        let tmp: string =  num.toFixed(2).toString().replace('.', ',');

        for (var i = tmp.length-4; i >= 0 ; i--) {
            str = tmp.substr(i,1) + str;
            if (str.replace('.','').length % 3 == 0 && i > 0) str = '.' + str;
        }
        str += tmp.substr(tmp.length-3,3);
        if (neg) str = '(' + str + ')';

        return str;

    }

    valText2Num(txt: string): number {

        let num: number;
        if (txt.substring(0,0) == '(') txt = txt.substring(1,txt.length-2);

        if (txt == '') {
            num = 0;
        } else {
            num = Number(txt.replace('.', '').replace(',','.'));
        }
        
        return num;

    }

}