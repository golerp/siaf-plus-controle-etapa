import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    senha!: string;
    email!: string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
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

        // Inicia o loading manual
        this.loadingService.show();

        this.authService.login(this.email, this.senha).subscribe({
            next: (response: any) => {
                const empresa = response[0];
                localStorage.setItem('user_id', empresa.usuario.id);

                this.handleTokenRequest(empresa);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Usuário ou senha inválidos',
                });
                this.loadingService.hide();
            },
        });
    }

    private handleTokenRequest(empresa: any): void {
        this.authService.getToken(this.email, this.senha, empresa.id).subscribe({
            next: (res: any) => {
                localStorage.setItem('authToken', res.access_token);
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
}
