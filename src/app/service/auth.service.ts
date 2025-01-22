import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl

    constructor(private router: Router, private http: HttpClient) { }


    login(login: string, senha: string): any {
        const headers = new HttpHeaders({
            login: login,
            senha: senha,
        });

        return this.http.post(
            `${this.apiUrl}/v1/integracao/empresa/filiais`,
            {},
            { headers }
        );
    }

    getToken(usuario: string, senha: string, filialId: string): Observable<any> {
        const body = `grant_type=password&username=${encodeURIComponent(
          usuario
        )}&password=${encodeURIComponent(senha)}&FilialID=${encodeURIComponent(filialId)}`;
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });
    
        return this.http.post(`${this.apiUrl}/v1/painelcontrole/usuario/token`, body, { headers });
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
