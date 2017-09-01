import { Injectable } from "@angular/core";

import { Findoc1 } from '../../findoc1/findoc1';

@Injectable()
export class DbvarService {

    // dbMsg 

    private msg:string = "msg1";

    getMsg():string {
        return this.msg;
    }

    setMsg(txt:string):string {
        this.msg = txt;
        return this.msg;
    }

    // dbFin

    private dbFin:Findoc1[] = this.iniFin();

    iniFin() {

        let db:Findoc1[] = [];

        db.push({
            id: 1,
            cod: '254.999.999',
            std: 'Emp.pré fixado',
            stdList: ['Emp.pré fixado'],
            dt: '20/02/2016',
            val: '4.000,00',
            valiof: '51,71',
            valseg: '63,33',
            n: 12,
            pmt: '466,66',
            dt1: '20/03/2016'
        });

        return db;
    }

    getFinList():Findoc1[] {

        return this.dbFin;

    }

    postFin(data:Findoc1):number {

        if (data.id == 1) {
            this.dbFin[0].cod = data.cod;
            this.dbFin[0].std = data.std;
            this.dbFin[0].dt = data.dt;
            this.dbFin[0].val = data.val;
            this.dbFin[0].valiof = data.valiof;
            this.dbFin[0].valseg = data.valseg;
            this.dbFin[0].n = data.n;
            this.dbFin[0].pmt = data.pmt;
            this.dbFin[0].dt1 = data.dt1;          
        } else {
            data.id = null
        }

        return data.id;
    }


}