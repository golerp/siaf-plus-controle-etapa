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

    getOrdens(top: number, skip: number, filter?: any): Observable<any[]> {
        let params = new HttpParams()
            .set('$top', top.toString())
            .set('$skip', skip.toString());
    
        if (filter) {
            const filterStrings: string[] = [];
    
            Object.entries(filter).forEach(([key, value]) => {
                if (Array.isArray(value) && value != null && value.length) {
                    const conditions = value.map(v => `${key} eq '${v}'`).join(' or ');
                    filterStrings.push(`(${conditions})`);
                } else if (value !== null && value !== undefined && value !== '' && typeof value === 'string' && value.length) {
                    filterStrings.push(`${key} eq '${value}'`);
                }
            });
    
            if (filterStrings.length) {
                params = params.set('$filter', filterStrings.join(' and '));
            }
        }
    
        return this.http.get<any>(`${this.apiNodeUrl}/oficina/ordem-servico`, { params });
    }
    
}
