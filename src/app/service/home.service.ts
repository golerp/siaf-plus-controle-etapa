import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private apiNodeUrl = environment.apiNodeUrl

    constructor(private router: Router, private http: HttpClient) { }

    getOrdens(top: number, skip: number): Observable<any[]> {
        const params = new HttpParams()
        .set('$top', top.toString())
        .set('$skip', skip.toString());
        
        return this.http.get<any>(`${this.apiNodeUrl}/oficina/ordem-servico`, { params });
    }
}
