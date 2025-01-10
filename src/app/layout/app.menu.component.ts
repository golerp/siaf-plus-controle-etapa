import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'INTEGRAÇÃO',
                items: [
                    { label: 'Cliente', icon: 'pi pi-fw pi-id-card', routerLink: ['/integracao/cliente'] },
                    { label: 'Usuario', icon: 'pi pi-fw pi-users', routerLink: ['/integracao/usuario'] },
                ]
            },
            {
                label: 'ESTOQUE',
                items: [
                    { label: 'Produto', icon: 'pi pi-fw pi-box', routerLink: ['/blocks'], badge: 'NEW' },
                ]
            }
        ];
    }
}
