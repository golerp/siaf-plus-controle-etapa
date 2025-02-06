import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');

        this.loadingService.show();

        const clonedReq = this.cloneRequestWithHeaders(req, token);

        return next.handle(clonedReq).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    private cloneRequestWithHeaders(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        const headers = this.getHeaders(req, token);
        return req.clone({ setHeaders: headers });
    }

    private getHeaders(req: HttpRequest<any>, token: string | null): { [header: string]: string } {
        const headers: { [header: string]: string } = {
            Authorization: token ? `Bearer ${token}` : '',
        };

        // Não sobrescrever Content-Type se a requisição for multipart/form-data ou já tiver Content-Type
        if (!req.headers.has('Content-Type')) {
            if (req.body instanceof FormData) {
                // Não definimos Content-Type explicitamente para FormData
                return headers;
            }

            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }
}