"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var findoc_component_1 = require('./findoc1/findoc.component');
var findoc1_detail_component_1 = require('./findoc1/findoc1-detail.component');
var finrepban_component_1 = require('./finrepban/finrepban.component');
var finrepmov_component_1 = require('./finrepmov/finrepmov.component');
var finrepmov_m_component_1 = require('./finrepmov-m/finrepmov-m.component');
var finrepled_component_1 = require('./finrepled/finrepled.component');
var param_component_1 = require('./param/param.component');
var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'findoc', component: findoc_component_1.FindocComponent },
    { path: 'findoc-detail/:id', component: findoc1_detail_component_1.Findoc1DetComponent },
    { path: 'finrepban', component: finrepban_component_1.FinRepBanComponent },
    { path: 'finrepmov', component: finrepmov_component_1.FinRepMovComponent },
    { path: 'finrepmovm', component: finrepmov_m_component_1.FinRepMovMComponent },
    { path: 'finrepled', component: finrepled_component_1.FinRepLedComponent },
    { path: 'findoc1det', component: findoc1_detail_component_1.Findoc1DetComponent },
    { path: 'param', component: param_component_1.ParamComponent }
];
exports.appRouteProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map