import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css']
})
export class HomeComponent {
    
    constructor(
    private router: Router,
    private homeService: HomeService) { }
}