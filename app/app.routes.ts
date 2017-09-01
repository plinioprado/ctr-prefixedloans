import { provideRouter, RouterConfig }  from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { FindocComponent }  from './findoc1/findoc.component';
import { Findoc1DetComponent }  from './findoc1/findoc1-detail.component';
import { FinRepBanComponent } from './finrepban/finrepban.component';
import { FinRepMovComponent } from './finrepmov/finrepmov.component';
import { FinRepMovMComponent } from './finrepmov-m/finrepmov-m.component';
import { FinRepLedComponent } from './finrepled/finrepled.component';

import { ParamComponent }  from './param/param.component';

const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'findoc', component: FindocComponent },
    { path: 'findoc-detail/:id', component: Findoc1DetComponent },
    { path: 'finrepban', component: FinRepBanComponent },
    { path: 'finrepmov', component: FinRepMovComponent },
    { path: 'finrepmovm', component: FinRepMovMComponent },
    { path: 'finrepled', component: FinRepLedComponent },
    { path: 'findoc1det', component: Findoc1DetComponent },
    { path: 'param', component: ParamComponent }

];

export const appRouteProviders = [
    provideRouter(routes)
];

