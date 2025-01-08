import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl

    constructor(private router: Router, private http: HttpClient) { }


    login(email: string, senha: string): any {
        return this.http.post(`${this.apiUrl}/usuario/token`, { email, senha })
      }
      

    isAuthenticated(): boolean {
        // Aqui você implementa a lógica para verificar se o usuário está autenticado
        // Por exemplo, verificando se existe um token válido no localStorage ou cookie
        const token = localStorage.getItem('authToken');
        return !!token; // Retorna true se o token existir
    }

    logout(): void {
        localStorage.removeItem('authToken'); // Remove o token
        this.router.navigate(['/auth']); // Redireciona para a página de login
    }
}
