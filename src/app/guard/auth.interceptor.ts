import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');

        // Mostra o loading no início da requisição
        this.loadingService.show();

        // Clona a requisição mantendo todas as propriedades originais
        const cloned = req.clone({
            setHeaders: {
                Authorization: token ? `Bearer ${token}` : '',
                // Apenas adiciona o Content-Type se não estiver definido
                ...(!req.headers.has('Content-Type') && { 'Content-Type': 'application/json' }),
            },
        });

        return next.handle(cloned).pipe(
            // Esconde o loading ao finalizar a requisição
            finalize(() => this.loadingService.hide())
        );
    }
}
