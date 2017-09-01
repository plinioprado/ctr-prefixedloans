import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Findoc1Service } from './findoc1.service';
import { NumberFormatPipe } from '../shared/pipes/numberFormat.pipe';

@Component({
    templateUrl: 'app/findoc1/findoc.component.html',
    providers: [Findoc1Service],
    pipes: [NumberFormatPipe]
})
export class FindocComponent implements OnInit { 

    list:any[] = [];

    constructor(
        private router: Router,
        private findoc1service: Findoc1Service) {
    }

    ngOnInit() {
        this.list = this.findoc1service.getList();
        //this.findoc1service.getList2().then(l => this.list = l); //http version
    }

    new() {
        this.detail(0);
    }

    detail(id: number):boolean {
        let link = ['/findoc-detail', id];
        this.router.navigate(link);
        return false;
    }

}