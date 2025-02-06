import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/service/loading.service';
import { FullscreenService } from 'src/app/service/fullscreen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    mostrarDropdown: boolean = false;
    valCheck: string[] = ['remember'];
    empresas: any[] = [];
    empresaSelecionada: any = null;
    senha!: string;
    email!: string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private fullscreenService: FullscreenService,
        private loadingService: LoadingService,
        private messageService: MessageService) { }

    login(): void {
        if (!this.email) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Aviso!',
                detail: 'O campo email precisa ser informado!',
            });
            return;
        }

        if (!this.senha) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Aviso!',
                detail: 'O campo senha precisa ser informado!',
            });
            return;
        }

        document.addEventListener('click', this.enterFullscreenOnce);

        this.authService.login(this.email, this.senha).subscribe({
            next: (response: any) => {
                if (response.length > 1) {
                    this.empresas = response;
                    this.mostrarDropdown = true;
                } else {
                    const empresa = response[0];
                    this.salvarDadosStorageEmpresa(empresa);
                    this.handleTokenRequest(empresa);
                }
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Usuário ou senha inválidos',
                });
            },
        });
    }

    private handleTokenRequest(empresa: any): void {
        this.authService.getToken(this.email, this.senha, empresa.id).subscribe({
            next: (res: any) => {
                localStorage.setItem('authToken', res.access_token);
                localStorage.setItem('expires', res.expires);

                // this.fullscreenService.enableFullscreen();

                this.router.navigate(['/inicio']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível obter o token. Tente novamente.',
                });
            },
            complete: () => {
                // Oculta o loading ao finalizar a requisição do token
                this.loadingService.hide();
            },
        });
    }

    loginFacial() {
        this.router.navigate(['auth/facial']); // Redireciona para o login facial
    }

    prosseguirComEmpresa() {
        if (this.empresaSelecionada) {
            this.salvarDadosStorageEmpresa(this.empresaSelecionada);
            this.handleTokenRequest(this.empresaSelecionada);
        }
    }

    salvarDadosStorageEmpresa(empresa: any) {
        localStorage.setItem('usuario', JSON.stringify(empresa.usuario));
        localStorage.setItem('filiais', JSON.stringify(this.empresas));
        localStorage.setItem('empresa', JSON.stringify(empresa));
    }

    private enterFullscreenOnce = () => {
        this.fullscreenService.enableFullscreen();
        document.removeEventListener('click', this.enterFullscreenOnce);
    };
}
