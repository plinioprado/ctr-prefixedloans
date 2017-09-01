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
var router_1 = require('@angular/router');
var findoc1_service_1 = require('./findoc1.service');
var math_service_1 = require('../shared/services/math.service');
var numberFormat_pipe_1 = require('../shared/pipes/numberFormat.pipe');
var movItem = (function () {
    function movItem() {
    }
    return movItem;
}());
var Findoc1DetComponent = (function () {
    function Findoc1DetComponent(route, findoc1service, math) {
        this.route = route;
        this.findoc1service = findoc1service;
        this.math = math;
        this.mov0 = [];
        this.mov = [];
        this.msg2 = '_';
    }
    Findoc1DetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.data = _this.findoc1service.get(id);
            //this.findoc1service.get(id).then(d => this.data = d); // with promise
        });
        this.ro = (this.data.id != 0);
        this.calc();
    };
    Findoc1DetComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    Findoc1DetComponent.prototype.calc = function () {
        this.mov0 = [];
        var dt;
        var val;
        var sub = 0;
        this.pmtTot = 0;
        this.pmtTot = 0;
        this.nAvg = 0;
        this.irr = 0;
        dt = this.math.dtStr2Dat(this.data.dt);
        val = this.math.valText2Num(this.data.val);
        this.mov0.push({ dt: dt, hist: 'Captação', val: val });
        sub += val;
        val = this.math.valText2Num(this.data.valiof);
        if (val != 0) {
            this.mov0.push({ dt: dt, hist: 'IOF', val: val });
            sub += val;
        }
        val = this.math.valText2Num(this.data.valseg);
        if (val != 0) {
            this.mov0.push({ dt: dt, hist: 'Seguro', val: val });
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
    };
    Findoc1DetComponent.prototype.edit = function () {
        this.ro = !this.ro;
    };
    Findoc1DetComponent.prototype.back = function () {
        window.history.back();
    };
    Findoc1DetComponent.prototype.onSubmit = function () {
        console.log('submit');
        this.findoc1service.post(this.data);
        this.back();
        //this.router.navigate(['/findoc']);
    };
    Findoc1DetComponent.prototype.dtNext = function (dt) {
        var next = new Date(dt.getFullYear(), (dt.getMonth() + 1), dt.getDate());
        return next;
    };
    Findoc1DetComponent.prototype.setN = function (field) {
        var val = Number(+field.value);
        if (val != 0)
            field.valid = false;
        this.data.n = val;
    };
    Findoc1DetComponent.prototype.onKeyPressVal = function (event, prev) {
        var char = event.key;
        var regex = /^[0-9/,]$/;
        if (!regex.test(char))
            return false;
        if (prev.search(",") != -1 && event.key == ",")
            return false;
        return true;
    };
    Findoc1DetComponent.prototype.onKeyPressInt = function (event) {
        var char = event.key;
        var regex = /^[0-9]$/;
        return regex.test(char);
    };
    Findoc1DetComponent.prototype.onKeyPressDt = function (event, prev) {
        var char = event.key;
        var regex = /^[0-9\/]$/;
        if (!regex.test(char))
            return false;
        if (prev.split("/").length > 3 && event.key == "/")
            return false;
        return true;
    };
    Findoc1DetComponent.prototype.onKeyUpVal = function (event) {
        this.msg2 += event.target.value;
    };
    Findoc1DetComponent.prototype.valFormat = function (val) {
        console.log(val);
        var num = this.math.valText2Num(val);
        val = this.math.valNum2Text(num);
        console.log(val);
        return val;
    };
    Findoc1DetComponent.prototype.valUnformat = function (val) {
        return val.replace('.', '');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Findoc1DetComponent.prototype, "id", void 0);
    Findoc1DetComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/findoc1/findoc1-detail.component.html',
            providers: [findoc1_service_1.Findoc1Service],
            pipes: [numberFormat_pipe_1.NumberFormatPipe]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, findoc1_service_1.Findoc1Service, math_service_1.MathService])
    ], Findoc1DetComponent);
    return Findoc1DetComponent;
}());
exports.Findoc1DetComponent = Findoc1DetComponent;
//# sourceMappingURL=findoc1-detail.component.js.map