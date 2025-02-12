import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EtapaService {
    private apiNodeUrl = environment.apiNodeUrl
    private intEmpresaId!: any;

    constructor(private router: Router, private http: HttpClient) { 
    }

    getAll(): Observable<any[]> {        
        return this.http.get<any>(`${this.apiNodeUrl}/oficina/etapa`);
    }
}
