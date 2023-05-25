import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MunicipioModel } from '../../models/municipios.model';
import { AuthServicesModule } from './services.module';

@Injectable({
  providedIn: AuthServicesModule
})
export class MunicipioService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  obtenerMunicipiosPorIdDepartamento(idDepartamento: number): Observable<MunicipioModel[]> {
    return this.http.get<MunicipioModel[]>(`${this.baseUrl}/api/Municipios/GetMunicipiosByIdDepartamento/${idDepartamento}`).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}
