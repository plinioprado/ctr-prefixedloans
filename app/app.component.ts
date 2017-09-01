import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { FindocComponent }  from './findoc1/findoc.component';
import { Findoc1DetComponent }  from './findoc1/findoc1-detail.component';
import { FinRepBanComponent } from './finrepban/finrepban.component';
import { FinRepMovComponent } from './finrepmov/finrepmov.component';
import { FinRepMovMComponent } from './finrepmov-m/finrepmov-m.component';
import { FinRepLedComponent } from './finrepled/finrepled.component';

import { HomeService }  from './home/home.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HomeService],
    precompile: [
        HomeComponent, FindocComponent, Findoc1DetComponent,
        FinRepBanComponent, FinRepMovComponent, FinRepMovMComponent,
        FinRepLedComponent
    ]
})
export class AppComponent {

    companyName = 'Exemplo Serviços Ltda.';

    menuClose() {
        console.log('close');
    }

}


