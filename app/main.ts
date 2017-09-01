import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http'

import { AppComponent } from './app.component';
import { appRouteProviders } from './app.routes';
import { MathService } from './shared/services/math.service';
import { DbvarService } from './shared/services/dbvar.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    appRouteProviders,
    disableDeprecatedForms(),
    provideForms(),
    MathService,
    DbvarService
])
.catch((err: any) => console.error(err));