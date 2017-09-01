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
var router_deprecated_1 = require('@angular/router-deprecated');
var findoc1_service_1 = require('./findoc1.service');
var Findoc1Component = (function () {
    function Findoc1Component(_router, _routeParams, findocservice) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.findocservice = findocservice;
    }
    Findoc1Component.prototype.ngOnInit = function () {
        this.list = this.findocservice.getList();
    };
    Findoc1Component.prototype.ins = function () {
        this._router.navigate(['Findoc1det']);
    };
    Findoc1Component = __decorate([
        core_1.Component({
            templateUrl: 'app/findoc1/findoc1.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [findoc1_service_1.FindocService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, findoc1_service_1.FindocService])
    ], Findoc1Component);
    return Findoc1Component;
}());
exports.Findoc1Component = Findoc1Component;
//# sourceMappingURL=findoc1.component.js.map