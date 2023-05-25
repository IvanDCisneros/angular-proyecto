import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartamentoModel } from '../../models/departamento.model';
import { AuthServicesModule } from './services.module';

@Injectable({
  providedIn: AuthServicesModule
})
export class DepartamentoService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<DepartamentoModel[]> {
    return this.http.get<DepartamentoModel[]>(`${this.baseUrl}/api/Departamentos/GetAll`);
  }
}
