import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './service/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, public loadingService: LoadingService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
