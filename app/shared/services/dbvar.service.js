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
var core_1 = require("@angular/core");
var DbvarService = (function () {
    function DbvarService() {
        // dbMsg 
        this.msg = "msg1";
        // dbFin
        this.dbFin = this.iniFin();
    }
    DbvarService.prototype.getMsg = function () {
        return this.msg;
    };
    DbvarService.prototype.setMsg = function (txt) {
        this.msg = txt;
        return this.msg;
    };
    DbvarService.prototype.iniFin = function () {
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
    DbvarService.prototype.getFinList = function () {
        return this.dbFin;
    };
    DbvarService.prototype.postFin = function (data) {
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
        }
        else {
            data.id = null;
        }
        return data.id;
    };
    DbvarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DbvarService);
    return DbvarService;
}());
exports.DbvarService = DbvarService;
//# sourceMappingURL=dbvar.service.js.map