import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

//import 'rxjs/add/operator/toPromise';

import { Findoc1 } from './findoc1';
import { MathService } from '../shared/services/math.service';
import { DbvarService } from '../shared/services/dbvar.service';
import { FINDOC1 } from './mock-findoc1';

@Injectable()
export class Findoc1Service {

    private url = 'app/findoc1/findoc1.json';

    constructor(
        private http: Http,
        public math: MathService,
        public dbvarService: DbvarService) {
    }


    getDb(): Findoc1[] {

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

    get(id: number): Findoc1 {

        let db:Findoc1[] = this.dbvarService.getFinList();
        let item:Findoc1 = new Findoc1();

        if (id != 0) {
            item = db.find(obj => obj.id == id);           
        }

        return item;
    }


    getList():any[] {

        let db:Findoc1[] = this.dbvarService.getFinList();

        let list: any[] = [];

        let dtx: Date;

        for (var item of db) {
            dtx = this.math.dtStr2Dat(item.dt1),
            list.push({
                id: item.id,
                std: item.std,
                dt: this.math.dtStr2Dat(item.dt),
                dtf: new Date(dtx.getFullYear(), dtx.getMonth() + item.n, dtx.getDate()),
                val: this.math.valText2Num(item.val),
                irr: this.calcIrr(item)
            })
        }

        return list;
    }

    // getList2()  {
    //    Deprecated in favor or Http/Json, not deleted for future storage of Param
    //    return Promise.resolve(FINDOC1);
    // }
    
    // getList2(): Promise<any[]> {

    //     // For future http version
    //     return this.http.get(this.url)
    //         .toPromise()
    //         .then(response => response.json().data)
    //         .catch(this.handleError);
    // }

    private handleError(error: any) {

        // For future http version
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
  }

    getMov(id:number): any[] {

        let item:Findoc1 = this.get(id);

        let list:any[] = [];

        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finban', val: this.math.valText2Num(item.val) });
        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finiof', val: this.math.valText2Num(item.valiof) });
        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finseg', val: this.math.valText2Num(item.valseg) });
        let dtPmt:Date = this.math.dtStr2Dat(item.dt1);
        let hist:string;
        for (var i = 1; i <= item.n; i++) {
            hist = 'Operacao Capital Giro Contr ' + item.cod + ' Parc ' + i + '/'+ item.n;
            list.push({dt: dtPmt, std: 'finrep', hist: hist, val: - this.math.valText2Num(item.pmt) });
            dtPmt = new Date(dtPmt.getFullYear(), Number(dtPmt.getMonth()) + 1, dtPmt.getDate());
        }

        return list;
    }


    listFinMov(id:number): any[] {

        // var pmtcount = mov.filter(function(item){return item.std=='finrep'}).length;

        let list:any[] = [];
        var dt;
        let hist:string;
        let docto:string;
        let val:number;
        let bal:number = 0;

        let item:Findoc1 = this.get(id);
        var dtOld;
        var day = this.math.dtStr2Dat(item.dt1).getDate();
        var irr = this.calcIrr(item);

        dt = this.math.dtStr2Dat(item.dt);
        dtOld = dt;
        hist = 'Captação';
        docto = item.cod;
        bal += this.math.valText2Num(item.val);
        list.push({ dt: dt, std: 'ban', hist: hist, docto: docto, val: this.math.valText2Num(item.val), bal: bal });
        
        hist = 'Encargos IOF e seguro';
        val = this.math.valText2Num(item.valiof) + this.math.valText2Num(item.valseg);
        bal += val;
        list.push({ dt: dt, std: 'enc', hist: hist, docto: docto, val: val, bal: bal });

        hist = 'Débito IOF';
        val = -this.math.valText2Num(item.valiof);
        bal += val;
        list.push({ dt: dt, std: 'iof', hist: hist, docto: docto, val: val, bal: bal });
        
        hist = 'Débito Seguro';
        val = -this.math.valText2Num(item.valseg);
        bal += val;
        list.push({ dt: dt, std: 'seg', hist: hist, docto: docto, val: val, bal: bal });
        
        dt = new Date(dt.getFullYear(), dt.getMonth()+1, 0);
        val = bal*(Math.pow(1+irr, this.math.dtDif(dtOld,dt)/360)-1);
        bal += val;
        list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
        dtOld = dt;

        dt = this.math.dtStr2Dat(item.dt1);
        for (var i = 1; i <= item.n; i++) {

            if (i > 1) dt = new Date(dt.getFullYear(), Number(dt.getMonth()) + 1, day);
            if (i == item.n) {
                val = (this.math.valText2Num(item.pmt)-bal);
            } else {
                val = bal*(Math.pow(1+irr, day/360)-1);
            }
            bal += val;
            list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
            
            hist = 'Repagamento Parc ' + i + '/'+ item.n;
            val = -this.math.valText2Num(item.pmt);
            bal += val;
            list.push({dt: dt, std: 'rep', hist: hist, docto: docto, val: val, bal: bal });
            dtOld = dt;

            if (i < item.n) {
                dt = new Date(dt.getFullYear(), dt.getMonth()+1, 0);
                val = bal*(Math.pow(1+irr, this.math.dtDif(dtOld,dt)/360)-1);
                bal += val;
                list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
                dtOld = dt;                
            }

        }

        return list;
    }


    listFinMovM(id:number):any[] {

        let mov:any[] = this.listFinMov(id);

        let list:any[] = [];
        let dt:Date;
        let dtLast = new Date(1900,1,1);

        for (var i=0;i <mov.length; i++) {

            // Get date
            dt = new Date(mov[i].dt.getFullYear(),mov[i].dt.getMonth(),1);
            
            // If new month, create
            if (this.math.dtDif(dtLast, dt) != 0) {

                list.push({
                    dt: dt,
                    valPrev: 0,
                    valBan: 0,
                    valRep: 0,
                    valPal: 0,
                    val: 0,
                });
                if (list.length > 1) {
                    list[list.length-1].valPrev = list[list.length-2].val;
                    list[list.length-1].val = list[list.length-1].valPrev;
                }                
            }

            // Anyway, update
            if (mov[i].std == 'ban') {
                list[list.length-1].valBan += mov[i].val;
                list[list.length-1].val += mov[i].val;
            } else if (mov[i].std == 'rep') {
                list[list.length-1].valRep += mov[i].val;
                list[list.length-1].val += mov[i].val;
            } else {
                list[list.length-1].valPal += mov[i].val;
                list[list.length-1].val += mov[i].val;
            }
            
            dtLast = dt;
            
        }

        return list;

    }


    listBst(id:number):any[] {

        let list:any[] = [];
        let mov:any[] = this.getMov(id);
        let hs:string = '';
        let vl: number;
        let bl: number = 0;

        for (var item of mov) {
            if (item.std == 'finban') {
                hs = 'Operacao Capital Giro';
            } else if (item.std == 'finiof' || item.std == 'finseg') {
                continue;
            } else {
                hs = item.hist;
            }
            vl  = item.val;
            bl += vl;
            list.push({
                dt: item.dt,
                hist: hs,
                val: vl,
                bal: bl
            })
        }

        return list;
    }


    listLed(id:number):any[] {

        let list:any[] = [];
        let mov:any[] = this.listFinMov(id);
        let acc:string;
        let accName:string;

        for (var i=0; i<mov.length; i++) {

            if (mov[i].std == 'enc' ) continue;

            // Seq 1

            if (mov[i].std == 'ban' || mov[i].std == 'rep') {
                acc = '111'; accName = 'Caixa e bancos';
            } else if (mov[i].std == 'iof' || mov[i].std == 'seg'|| mov[i].std == 'jur') {
                acc = '431'; accName = 'Juros e encargos s/financ.';
            } else {
                acc = '999'; accName = 'A definir';
            }

            list.push({
                dt: mov[i].dt,
                hist: mov[i].hist,
                docto: mov[i].docto,
                acc: acc,
                accName: accName,
                valDb: (mov[i].val > 0) ? mov[i].val : null,
                valCr: (mov[i].val < 0) ? mov[i].val : null
            });

            // Seq 2

            if (mov[i].std == 'ban' || mov[i].std == 'rep') {
                acc = '211'; accName = 'Captações financeiras';
            } else if (mov[i].std == 'iof' || mov[i].std == 'seg'|| mov[i].std == 'jur') {
                acc = '211'; accName = 'Captações financeiras';
            } else {
                acc = '999'; accName = 'A definir';
            }

            list.push({
                dt: mov[i].dt,
                acc: acc,
                accName: accName,
                valDb: (mov[i].val < 0) ? -mov[i].val : null,
                valCr: (mov[i].val > 0) ? -mov[i].val : null
            });
        }

        return list;

    }


    calcNAvg(data:Findoc1):number {
        
        let dt0:Date = this.math.dtStr2Dat(data.dt);
        let dt1:Date = this.math.dtStr2Dat(data.dt1);
        let dtn:Date;
        let n:number = data.n;

        let tmp:number = 0;
        for (var i = 0; i <= n; i++) {
            dtn = new Date(dt1.getFullYear(), dt1.getMonth()+i-1, dt1.getDate());
            tmp += this.math.dtDif(dt0,dtn);
        }

        tmp = tmp/n;

        return tmp;
    }

    calcIrr(data:Findoc1):number {

        let pmt = this.math.valText2Num(data.pmt);
        let pv = this.math.valText2Num(data.val);
        let n = data.n;

        let i = 0;
        let npv = this.calcNpv(data, i);

        // Get iMax
        for (var _i = 0; _i < 20; _i++) {
            npv = this.calcNpv(data, i);
            if (npv < 0) {
                if (i < 0.1) {
                    i = 0.1;
                } else {
                    i = i*2;
                } 
            } else {
                break;
            }
        }
        let iMax = i;
        let npvMax = npv;

        // Get iMin
        for (var _i = 0; _i < 20; _i++) {
            npv = this.calcNpv(data, i);
            if (npv > 0) {
                if (i > -0.1) {
                    i = -0.1;
                } else {
                    i = i*2;
                } 
            } else {
                break;
            }
        }
        let iMin = i;
        let npvMin = npv;

        // Get i
        for (var _i = 0; _i < 20; _i++) {
            i = (iMin+iMax)/2;
            npv = this.calcNpv(data, i);
            if (Math.abs(npv) < 0.01) {
                break
            } else if ( npv < 0) {
                if (npvMin < npv) {
                    iMin = i;
                    npvMin = npv;                    
                }
            } else {
                if (npvMax > npv) {
                    iMax = i;
                    npvMax = npv;                    
                }
            }
        }
        
        return i;
    }

    calcNpv(data:Findoc1, irr:number):number {

        let pmt = -this.math.valText2Num(data.pmt);
        let pv = 0;
        let dt0 = this.math.dtStr2Dat(data.dt);
        let dt = this.math.dtStr2Dat(data.dt1);
        let npv = this.math.valText2Num(data.val);

        for (var _i = 1; _i <= data.n; _i++) {
            pv = pmt / Math.pow(1+irr, this.math.dtDif(dt0,dt)/360);
            npv += pv;
            dt = new Date(dt.getFullYear(), dt.getMonth()+1, dt.getDate());
        }
        npv = Math.round(npv * 100) / 100

        return npv;
    }

    post(data:Findoc1) {

        this.dbvarService.postFin(data);

    }

}