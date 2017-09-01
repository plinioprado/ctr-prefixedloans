"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var math_service_1 = require('./shared/services/math.service');
var dbvar_service_1 = require('./shared/services/dbvar.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    app_routes_1.appRouteProviders,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    math_service_1.MathService,
    dbvar_service_1.DbvarService
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map