import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Findoc1Service } from '../findoc1/findoc1.service';
import { NumberFormatPipe } from '../shared/pipes/numberFormat.pipe';

@Component({
    templateUrl: 'app/finrepled/finrepled.component.html',
    providers: [Findoc1Service],
    pipes: [NumberFormatPipe]
})
export class FinRepLedComponent implements OnInit {

    list:any[];

    constructor(
        private router: Router,
        private finServ:Findoc1Service) {
    }

    ngOnInit() {
        this.list = this.finServ.listLed(1);
    }

}