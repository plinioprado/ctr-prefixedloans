import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm }    from '@angular/forms';

import { Findoc1 } from './findoc1';
import { Findoc1Service } from './findoc1.service';
import { MathService } from '../shared/services/math.service';
import { NumberFormatPipe } from '../shared/pipes/numberFormat.pipe';

class movItem {
    public dt: Date;
    public hist: string;
    public val: number;
}

@Component({
    templateUrl: 'app/findoc1/findoc1-detail.component.html',
    providers: [Findoc1Service],
    pipes: [NumberFormatPipe]
})
export class Findoc1DetComponent implements OnInit, OnDestroy {

    @Input() id: number;
    sub: any;
    
    data: Findoc1;
    mov0: movItem[] = [];
    mov: movItem[] = [];
    pmtTot: number;
    dtLast: Date;
    nAvg: number;
    irr: number;
    msg2:string = '_';

    ro: boolean;

    constructor(
        private route: ActivatedRoute,
        private findoc1service: Findoc1Service,
        private math: MathService) {
    }


    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.data = this.findoc1service.get(id);
            //this.findoc1service.get(id).then(d => this.data = d); // with promise
        });
        this.ro = (this.data.id != 0);
        this.calc();
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    calc() {

        this.mov0 = [];

        let dt:Date;
        let val: number;
        let sub: number = 0;

        this.pmtTot = 0;
        this.pmtTot = 0;
        this.nAvg = 0;
        this.irr = 0;
        
        dt = this.math.dtStr2Dat(this.data.dt);
        val = this.math.valText2Num(this.data.val);
        this.mov0.push({dt: dt, hist: 'Captação', val: val });
        sub += val;

        val = this.math.valText2Num(this.data.valiof);
        if (val !=0) {
            this.mov0.push({dt: dt, hist: 'IOF', val: val });
            sub += val;           
        }

        val = this.math.valText2Num(this.data.valseg);
        if (val !=0) {
            this.mov0.push({dt: dt, hist: 'Seguro', val: val });
            sub += val;           
        }

        this.mov0.push({ dt: null, hist: 'Subtotal', val: sub });

        this.mov = [];
        dt = this.math.dtStr2Dat(this.data.dt1);

        if (this.data.n > 0) {

            val = this.math.valText2Num(this.data.pmt);

            for (var i = 1; i <= this.data.n; i++) {
                this.mov.push({ dt: dt, hist: 'Parcela ' + i, val: val });
                if (dt != null) {
                    this.dtLast = dt;
                    dt = this.dtNext(dt);
                }
                this.pmtTot += val;
            }
            this.mov.push({ dt: null, hist: 'Subtotal', val: this.pmtTot });

            if (dt != null && this.math.dtStr2Dat(this.data.dt) != null) {
                this.nAvg = this.findoc1service.calcNAvg(this.data);
                this.irr = this.findoc1service.calcIrr(this.data);
            }
        }
    }

    edit() {
        this.ro = !this.ro; 
    }

    back(): void {
        window.history.back();
    }

    onSubmit() {
        console.log('submit');
        this.findoc1service.post(this.data);
        this.back();
        //this.router.navigate(['/findoc']);
    }

    dtNext(dt: Date):Date {

        let next: Date = new Date ( dt.getFullYear(), ( dt.getMonth() + 1), dt.getDate() );
        return next;
    }

    setN(field: any) {
        let val: number = Number(+field.value);
        if (val !=0) field.valid = false;
        this.data.n = val;
    }

    onKeyPressVal(event: any, prev: string): boolean {
        let char:string = event.key;
        var regex = /^[0-9/,]$/;
        if(!regex.test(char)) return false;
        if(prev.search(",")!= -1 && event.key == ",") return false;
        return true;
    }

    onKeyPressInt(event: any): boolean {
        let char:string = event.key;
        var regex = /^[0-9]$/;
        return regex.test(char);
    }

    onKeyPressDt(event: any, prev: string): boolean {
        let char: string = event.key;
        var regex = /^[0-9\/]$/;
        if(!regex.test(char)) return false;
        if (prev.split("/").length > 3 && event.key == "/") return false;
        return true;
    }  

    onKeyUpVal(event: any) {
        this.msg2 += event.target.value;
    }

    valFormat(val: string): string {
        console.log(val);
        let num = this.math.valText2Num(val);
        val = this.math.valNum2Text(num);
        console.log(val);
        return val;
    }

    valUnformat(val: string):string {
        return val.replace('.','');
    }
}