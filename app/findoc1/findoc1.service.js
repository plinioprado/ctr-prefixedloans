"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//import 'rxjs/add/operator/toPromise';
var findoc1_1 = require('./findoc1');
var math_service_1 = require('../shared/services/math.service');
var dbvar_service_1 = require('../shared/services/dbvar.service');
var Findoc1Service = (function () {
    function Findoc1Service(http, math, dbvarService) {
        this.http = http;
        this.math = math;
        this.dbvarService = dbvarService;
        this.url = 'app/findoc1/findoc1.json';
    }
    Findoc1Service.prototype.getDb = function () {
        var db = [];
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
    };
    Findoc1Service.prototype.get = function (id) {
        var db = this.dbvarService.getFinList();
        var item = new findoc1_1.Findoc1();
        if (id != 0) {
            item = db.find(function (obj) { return obj.id == id; });
        }
        return item;
    };
    Findoc1Service.prototype.getList = function () {
        var db = this.dbvarService.getFinList();
        var list = [];
        var dtx;
        for (var _a = 0, db_1 = db; _a < db_1.length; _a++) {
            var item = db_1[_a];
            dtx = this.math.dtStr2Dat(item.dt1),
                list.push({
                    id: item.id,
                    std: item.std,
                    dt: this.math.dtStr2Dat(item.dt),
                    dtf: new Date(dtx.getFullYear(), dtx.getMonth() + item.n, dtx.getDate()),
                    val: this.math.valText2Num(item.val),
                    irr: this.calcIrr(item)
                });
        }
        return list;
    };
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
    Findoc1Service.prototype.handleError = function (error) {
        // For future http version
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    Findoc1Service.prototype.getMov = function (id) {
        var item = this.get(id);
        var list = [];
        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finban', val: this.math.valText2Num(item.val) });
        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finiof', val: this.math.valText2Num(item.valiof) });
        list.push({ dt: this.math.dtStr2Dat(item.dt), std: 'finseg', val: this.math.valText2Num(item.valseg) });
        var dtPmt = this.math.dtStr2Dat(item.dt1);
        var hist;
        for (var i = 1; i <= item.n; i++) {
            hist = 'Operacao Capital Giro Contr ' + item.cod + ' Parc ' + i + '/' + item.n;
            list.push({ dt: dtPmt, std: 'finrep', hist: hist, val: -this.math.valText2Num(item.pmt) });
            dtPmt = new Date(dtPmt.getFullYear(), Number(dtPmt.getMonth()) + 1, dtPmt.getDate());
        }
        return list;
    };
    Findoc1Service.prototype.listFinMov = function (id) {
        // var pmtcount = mov.filter(function(item){return item.std=='finrep'}).length;
        var list = [];
        var dt;
        var hist;
        var docto;
        var val;
        var bal = 0;
        var item = this.get(id);
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
        dt = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
        val = bal * (Math.pow(1 + irr, this.math.dtDif(dtOld, dt) / 360) - 1);
        bal += val;
        list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
        dtOld = dt;
        dt = this.math.dtStr2Dat(item.dt1);
        for (var i = 1; i <= item.n; i++) {
            if (i > 1)
                dt = new Date(dt.getFullYear(), Number(dt.getMonth()) + 1, day);
            if (i == item.n) {
                val = (this.math.valText2Num(item.pmt) - bal);
            }
            else {
                val = bal * (Math.pow(1 + irr, day / 360) - 1);
            }
            bal += val;
            list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
            hist = 'Repagamento Parc ' + i + '/' + item.n;
            val = -this.math.valText2Num(item.pmt);
            bal += val;
            list.push({ dt: dt, std: 'rep', hist: hist, docto: docto, val: val, bal: bal });
            dtOld = dt;
            if (i < item.n) {
                dt = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
                val = bal * (Math.pow(1 + irr, this.math.dtDif(dtOld, dt) / 360) - 1);
                bal += val;
                list.push({ dt: dt, std: 'jur', hist: 'Juros', docto: docto, val: val, bal: bal });
                dtOld = dt;
            }
        }
        return list;
    };
    Findoc1Service.prototype.listFinMovM = function (id) {
        var mov = this.listFinMov(id);
        var list = [];
        var dt;
        var dtLast = new Date(1900, 1, 1);
        for (var i = 0; i < mov.length; i++) {
            // Get date
            dt = new Date(mov[i].dt.getFullYear(), mov[i].dt.getMonth(), 1);
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
                    list[list.length - 1].valPrev = list[list.length - 2].val;
                    list[list.length - 1].val = list[list.length - 1].valPrev;
                }
            }
            // Anyway, update
            if (mov[i].std == 'ban') {
                list[list.length - 1].valBan += mov[i].val;
                list[list.length - 1].val += mov[i].val;
            }
            else if (mov[i].std == 'rep') {
                list[list.length - 1].valRep += mov[i].val;
                list[list.length - 1].val += mov[i].val;
            }
            else {
                list[list.length - 1].valPal += mov[i].val;
                list[list.length - 1].val += mov[i].val;
            }
            dtLast = dt;
        }
        return list;
    };
    Findoc1Service.prototype.listBst = function (id) {
        var list = [];
        var mov = this.getMov(id);
        var hs = '';
        var vl;
        var bl = 0;
        for (var _a = 0, mov_1 = mov; _a < mov_1.length; _a++) {
            var item = mov_1[_a];
            if (item.std == 'finban') {
                hs = 'Operacao Capital Giro';
            }
            else if (item.std == 'finiof' || item.std == 'finseg') {
                continue;
            }
            else {
                hs = item.hist;
            }
            vl = item.val;
            bl += vl;
            list.push({
                dt: item.dt,
                hist: hs,
                val: vl,
                bal: bl
            });
        }
        return list;
    };
    Findoc1Service.prototype.listLed = function (id) {
        var list = [];
        var mov = this.listFinMov(id);
        var acc;
        var accName;
        for (var i = 0; i < mov.length; i++) {
            if (mov[i].std == 'enc')
                continue;
            // Seq 1
            if (mov[i].std == 'ban' || mov[i].std == 'rep') {
                acc = '111';
                accName = 'Caixa e bancos';
            }
            else if (mov[i].std == 'iof' || mov[i].std == 'seg' || mov[i].std == 'jur') {
                acc = '431';
                accName = 'Juros e encargos s/financ.';
            }
            else {
                acc = '999';
                accName = 'A definir';
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
                acc = '211';
                accName = 'Captações financeiras';
            }
            else if (mov[i].std == 'iof' || mov[i].std == 'seg' || mov[i].std == 'jur') {
                acc = '211';
                accName = 'Captações financeiras';
            }
            else {
                acc = '999';
                accName = 'A definir';
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
    };
    Findoc1Service.prototype.calcNAvg = function (data) {
        var dt0 = this.math.dtStr2Dat(data.dt);
        var dt1 = this.math.dtStr2Dat(data.dt1);
        var dtn;
        var n = data.n;
        var tmp = 0;
        for (var i = 0; i <= n; i++) {
            dtn = new Date(dt1.getFullYear(), dt1.getMonth() + i - 1, dt1.getDate());
            tmp += this.math.dtDif(dt0, dtn);
        }
        tmp = tmp / n;
        return tmp;
    };
    Findoc1Service.prototype.calcIrr = function (data) {
        var pmt = this.math.valText2Num(data.pmt);
        var pv = this.math.valText2Num(data.val);
        var n = data.n;
        var i = 0;
        var npv = this.calcNpv(data, i);
        // Get iMax
        for (var _i = 0; _i < 20; _i++) {
            npv = this.calcNpv(data, i);
            if (npv < 0) {
                if (i < 0.1) {
                    i = 0.1;
                }
                else {
                    i = i * 2;
                }
            }
            else {
                break;
            }
        }
        var iMax = i;
        var npvMax = npv;
        // Get iMin
        for (var _i = 0; _i < 20; _i++) {
            npv = this.calcNpv(data, i);
            if (npv > 0) {
                if (i > -0.1) {
                    i = -0.1;
                }
                else {
                    i = i * 2;
                }
            }
            else {
                break;
            }
        }
        var iMin = i;
        var npvMin = npv;
        // Get i
        for (var _i = 0; _i < 20; _i++) {
            i = (iMin + iMax) / 2;
            npv = this.calcNpv(data, i);
            if (Math.abs(npv) < 0.01) {
                break;
            }
            else if (npv < 0) {
                if (npvMin < npv) {
                    iMin = i;
                    npvMin = npv;
                }
            }
            else {
                if (npvMax > npv) {
                    iMax = i;
                    npvMax = npv;
                }
            }
        }
        return i;
    };
    Findoc1Service.prototype.calcNpv = function (data, irr) {
        var pmt = -this.math.valText2Num(data.pmt);
        var pv = 0;
        var dt0 = this.math.dtStr2Dat(data.dt);
        var dt = this.math.dtStr2Dat(data.dt1);
        var npv = this.math.valText2Num(data.val);
        for (var _i = 1; _i <= data.n; _i++) {
            pv = pmt / Math.pow(1 + irr, this.math.dtDif(dt0, dt) / 360);
            npv += pv;
            dt = new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
        }
        npv = Math.round(npv * 100) / 100;
        return npv;
    };
    Findoc1Service.prototype.post = function (data) {
        this.dbvarService.postFin(data);
    };
    Findoc1Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, math_service_1.MathService, dbvar_service_1.DbvarService])
    ], Findoc1Service);
    return Findoc1Service;
}());
exports.Findoc1Service = Findoc1Service;
//# sourceMappingURL=findoc1.service.js.map