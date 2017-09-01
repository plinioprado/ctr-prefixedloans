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
var home_component_1 = require('./home/home.component');
var findoc_component_1 = require('./findoc1/findoc.component');
var findoc1_detail_component_1 = require('./findoc1/findoc1-detail.component');
var finrepban_component_1 = require('./finrepban/finrepban.component');
var finrepmov_component_1 = require('./finrepmov/finrepmov.component');
var finrepmov_m_component_1 = require('./finrepmov-m/finrepmov-m.component');
var finrepled_component_1 = require('./finrepled/finrepled.component');
var home_service_1 = require('./home/home.service');
var AppComponent = (function () {
    function AppComponent() {
        this.companyName = 'Exemplo Serviços Ltda.';
    }
    AppComponent.prototype.menuClose = function () {
        console.log('close');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [home_service_1.HomeService],
            precompile: [
                home_component_1.HomeComponent, findoc_component_1.FindocComponent, findoc1_detail_component_1.Findoc1DetComponent,
                finrepban_component_1.FinRepBanComponent, finrepmov_component_1.FinRepMovComponent, finrepmov_m_component_1.FinRepMovMComponent,
                finrepled_component_1.FinRepLedComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map