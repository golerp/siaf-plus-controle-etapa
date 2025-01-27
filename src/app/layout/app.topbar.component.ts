import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    nome: string

    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public router: Router) {

        let usuarioString = localStorage.getItem('usuario');
        let usuario = usuarioString ? JSON.parse(usuarioString) : null;

        this.nome = usuario.nome;
    }

    ngOnInit(): void {
        this.items = [
            // {
            //     label: 'Perfil',
            //     icon: 'pi pi-user-edit',
            //     command: () => {
            //         console.log('Perfil clicado');
            //         // Navegue para a página de perfil, se necessário
            //     },
            // },
            // {
            //     label: 'Configurações',
            //     icon: 'pi pi-cog',
            //     command: () => {
            //         console.log('Configurações clicado');
            //         // Navegue para as configurações, se necessário
            //     },
            // },
            // {
            //     separator: true,
            // },
            {
                label: 'Sair',
                icon: 'pi pi-sign-out',
                styleClass: 'logout-item',
                command: () => {
                    this.logout();
                },
            },
        ];
    }

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('expires');
        localStorage.removeItem('usuario');
        localStorage.removeItem('filiais');

        this.router.navigate(['/auth/login'])
        //localStorage.clear();
    }
}
