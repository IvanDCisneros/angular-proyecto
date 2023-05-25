import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentServicesModule } from './services.module';

@Injectable({
  providedIn: PaymentServicesModule
})
export class SuscripcionService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  obtenerValorSuscripcion(idCliente: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/Suscripcion/ObtenerValorSuscripcion/${idCliente}`);
  }
}
