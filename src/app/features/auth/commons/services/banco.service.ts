import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServicesModule } from './services.module';
import { Observable } from 'rxjs';
import { BancoModel } from '../../models/banco.model';

@Injectable({
  providedIn: AuthServicesModule
})
export class BancoService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BancoModel[]> {
    return this.http.get<BancoModel[]>(`${this.baseUrl}/api/Banco/GetAll`);
  }
}
