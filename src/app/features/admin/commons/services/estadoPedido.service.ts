import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EstadoPedidoModel } from '../../models/estadoPedido.model';
import { FechasPedidoModel } from '../../models/fechasReport.model';
import { PedidoModel } from '../../models/pedidos.model';
import { AdminServicesModule } from './services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class EstadoPedidoService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  obtenerEstadoPedidos(): Observable<EstadoPedidoModel[]> {
    return this.http.get<EstadoPedidoModel[]>(`${this.baseUrl}/api/EstadoPedido/GetAll`);
  }

}
