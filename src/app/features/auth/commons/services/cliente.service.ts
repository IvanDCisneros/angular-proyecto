import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IToken } from '../../../../shared/interfaces/token.interface';
import { ClienteModel } from '../../models/cliente.model';
import { AuthServicesModule } from './services.module';

@Injectable({
  providedIn: AuthServicesModule
})
export class ClienteService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createCliente(cliente: ClienteModel): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/api/Clientes/CreacionCliente`, cliente).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }

  actualizarCliente(cliente: ClienteModel): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/api/Clientes/ActualizarCliente`, cliente).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }

  obtenerCliente(idCliente: string): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.baseUrl}/api/Clientes/ObtenerCliente/${idCliente}`).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }

  recuperarPassword(usuario: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/Clientes/RecuperarPassword/${usuario}`).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}
