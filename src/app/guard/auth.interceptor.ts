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

        const cloned = req.clone({
            setHeaders: {
                Authorization: token ? `Bearer ${token}` : '',
                ...(!req.headers.has('Content-Type') && { 'Content-Type': 'application/json' }),
            },
        });

        return next.handle(cloned).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}
