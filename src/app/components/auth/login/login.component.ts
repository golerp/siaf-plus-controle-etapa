import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    senha!: string;
    email!: string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService) { }

    login() {
        this.authService.login(this.email, this.senha).subscribe({
            next: (response) => {
                localStorage.setItem('authToken', response.token); // Salva o token
                localStorage.setItem('user_id', response.id);
                this.router.navigate(['/dashboard']); // Redireciona para o dashboard
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha inválidos' });
            }
        });
    }

    loginFacial() {
        this.router.navigate(['auth/facial']); // Redireciona para o login facial
    }
}
