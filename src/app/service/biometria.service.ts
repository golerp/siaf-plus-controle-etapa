import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BiometriaService {
    private apiUrl = environment.apiUrl
    private apiBiometriaUrl = environment.apiBiometriaUrl

    constructor(private router: Router, private http: HttpClient) { }

    async cadastroFacial(formData: FormData): Promise<any> {
      return firstValueFrom(this.http.post(`${this.apiBiometriaUrl}/cadastro-facial`, formData));
    }
  
    async loginFacial(formData: FormData): Promise<any> {
      return firstValueFrom(this.http.post(`${this.apiBiometriaUrl}/login-facial`, formData));
    }

}
