import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdemStatus } from '../base/ordem-status.enum';
import { OrcamentoStatus } from '../base/orcamento-status.enum';

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
    
            // Adiciona as condições do filtro fornecido
            Object.entries(filter).forEach(([key, value]) => {
                if (Array.isArray(value) && value.length) {
                    const conditions = value.map(v => `${key} eq ${v}`).join(' or ');
    
                    if (value.length > 1) {
                        filterStrings.push(`(${conditions})`);
                    } else {
                        filterStrings.push(`${conditions}`);
                    }
                }
            });
    
            // Adiciona as condições padrão para excluir status 5 e 6
            filterStrings.push(`status ne ${OrdemStatus.Fechada}`);
            filterStrings.push(`status ne ${OrdemStatus.Cancelado}`);
    
            // Junta todas as condições com "and" e define o parâmetro $filter
            if (filterStrings.length) {
                params = params.set('$filter', filterStrings.join(' and '));
            }
        } else {
            // Se nenhum filtro for fornecido, aplica apenas as condições padrão
            params = params.set('$filter', `status ne ${OrdemStatus.Fechada} and status ne ${OrdemStatus.Cancelado}`);
        }
    
        return this.http.get<any[]>(`${this.apiNodeUrl}/oficina/ordem-servico`, { params });
    }
    
    getOrcamentos(top: number, skip: number, filter?: any): Observable<any[]> {
        let params = new HttpParams()
            .set('$top', top.toString())
            .set('$skip', skip.toString());
    
        if (filter) {
            const filterStrings: string[] = [];
    
            // Adiciona as condições do filtro fornecido
            Object.entries(filter).forEach(([key, value]) => {
                if (Array.isArray(value) && value.length) {
                    const conditions = value.map(v => `${key} eq ${v}`).join(' or ');
    
                    if (value.length > 1) {
                        filterStrings.push(`(${conditions})`);
                    } else {
                        filterStrings.push(`${conditions}`);
                    }
                }
            });
    
            // Adiciona as condições padrão para excluir status 5 e 6
            filterStrings.push(`status eq ${OrcamentoStatus.Novo}`);
    
            // Junta todas as condições com "and" e define o parâmetro $filter
            if (filterStrings.length) {
                params = params.set('$filter', filterStrings.join(' and '));
            }
        } else {
            // Se nenhum filtro for fornecido, aplica apenas as condições padrão
            params = params.set('$filter', `status eq ${OrcamentoStatus.Novo}`);
        }
    
        return this.http.get<any[]>(`${this.apiNodeUrl}/oficina/orcamento`, { params });
    }
    
}
