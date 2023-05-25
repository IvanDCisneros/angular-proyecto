import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { StorageService } from '../../../../core/services/storage.service';
import { FechasPedidoModel } from '../../models/fechasReport.model';
import { PedidoModel } from '../../models/pedidos.model';
import { AdminServicesModule } from './services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class PedidoService {

  private baseUrl = environment.apiBaseUrl;
  private helper = new JwtHelperService();

  get token() { return this.storageService.getToken(); }

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  obtenerPedidosPorEstadoYRangoFechas(fechas: FechasPedidoModel): Observable<PedidoModel[]> {
    return this.http.post<PedidoModel[]>(`${this.baseUrl}/api/Pedidos/ObtenerPedidos`, fechas);
  }

  obtenerPedidoPorId(idPedido: number): Observable<PedidoModel> {
    return this.http.get<PedidoModel>(`${this.baseUrl}/api/Pedidos/ObtenerPedidoPorId/${idPedido}`).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }

  guardarPedido(pedido: PedidoModel): Observable<number> {
    pedido.idUsuario = this.helper.decodeToken(this.token).nameid;
    return this.http.post<number>(`${this.baseUrl}/api/Pedidos/GuardarPedido`, pedido).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}
