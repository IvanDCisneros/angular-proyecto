import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../../../../shared/models/cart.model';
import { DatosParaFactura } from '../../models/datosParaFactura.model';
import { FacturaModel } from '../../models/factura.model';
import { PaymentServicesModule } from './services.module';

@Injectable({
  providedIn: PaymentServicesModule
})
export class FacturaService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  creacionFactura(listDatosParaFactura: DatosParaFactura[]): Observable<FacturaModel> {
    return this.http.post<FacturaModel>(`${this.baseUrl}/api/Factura/CreacionFactura`, listDatosParaFactura);
  }

  pagarFactura(idFactura: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/Factura/PagarFactura/${idFactura}`);
  }

  actualizarCarrito(listCartItem: CartItemModel[]): Observable<CartItemModel[]> {
    return this.http.post<CartItemModel[]>(`${this.baseUrl}/api/Factura/ActualizarCarrito`, listCartItem);
  }
}
