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
var MathService = (function () {
    function MathService() {
    }
    MathService.prototype.dtStr2Dat = function (str) {
        try {
            str = str.trim();
            if (str == '')
                return null;
            var arr = str.split('/');
            var dt = new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]));
            return dt;
        }
        catch (Error) {
            return Error;
        }
    };
    MathService.prototype.dtDif = function (dt1, dt2) {
        var dif = (dt2.getTime() - dt1.getTime()) / 86400000;
        return dif;
    };
    MathService.prototype.valNum2Text = function (num) {
        var neg = false;
        var str = '';
        if (num == null)
            return '';
        if (num == 0)
            return '0,00';
        if (num < 0) {
            neg = true;
            num = -num;
        }
        var tmp = num.toFixed(2).toString().replace('.', ',');
        for (var i = tmp.length - 4; i >= 0; i--) {
            str = tmp.substr(i, 1) + str;
            if (str.replace('.', '').length % 3 == 0 && i > 0)
                str = '.' + str;
        }
        str += tmp.substr(tmp.length - 3, 3);
        if (neg)
            str = '(' + str + ')';
        return str;
    };
    MathService.prototype.valText2Num = function (txt) {
        var num;
        if (txt.substring(0, 0) == '(')
            txt = txt.substring(1, txt.length - 2);
        if (txt == '') {
            num = 0;
        }
        else {
            num = Number(txt.replace('.', '').replace(',', '.'));
        }
        return num;
    };
    MathService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MathService);
    return MathService;
}());
exports.MathService = MathService;
//# sourceMappingURL=math.service.js.map