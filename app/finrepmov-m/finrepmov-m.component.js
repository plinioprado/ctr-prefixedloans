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
var findoc1_service_1 = require('../findoc1/findoc1.service');
var numberFormat_pipe_1 = require('../shared/pipes/numberFormat.pipe');
var FinRepMovMComponent = (function () {
    function FinRepMovMComponent(router, finserv) {
        this.router = router;
        this.finserv = finserv;
    }
    FinRepMovMComponent.prototype.ngOnInit = function () {
        this.list = this.finserv.listFinMovM(1);
    };
    FinRepMovMComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/finrepmov-m/finrepmov-m.component.html',
            providers: [findoc1_service_1.Findoc1Service],
            pipes: [numberFormat_pipe_1.NumberFormatPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, findoc1_service_1.Findoc1Service])
    ], FinRepMovMComponent);
    return FinRepMovMComponent;
}());
exports.FinRepMovMComponent = FinRepMovMComponent;
//# sourceMappingURL=finrepmov-m.component.js.map