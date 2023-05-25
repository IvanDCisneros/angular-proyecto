import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../../../core/services/storage.service';
import { ListasParametrizacionProducto } from '../../models/listasParametrizacionesProducto';
import { ProductoModel } from '../../models/producto.model';
import { ProductoImagenesModel } from '../../models/productoImagenes.model';
import { ProductoMercanciaModel } from '../../models/productoMercancia.model';
import { ProductoMercanciaDetalleModel } from '../../models/productoMercanciaDetalle.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiBaseUrl;
  private helper = new JwtHelperService();

  get token() { return this.storageService.getToken(); }

  constructor(
    private storageService: StorageService,
    private http: HttpClient) { }

  getProductosByIdCategoria(idCategoria: number): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.baseUrl}/api/Producto/GetProductoPorIdCategoriaPorSP/${idCategoria}`);
  }

  getImagenesProductoByIdProducto(idProducto: number): Observable<ProductoImagenesModel[]> {
    return this.http.get<ProductoImagenesModel[]>(`${this.baseUrl}/api/Producto/GetImagenesProductoByIdProducto/${idProducto}`);
  }

  getProductosMercanciaByIdCategoria(idCategoria: number): Observable<ProductoMercanciaModel[]> {
    return this.http.get<ProductoMercanciaModel[]>(`${this.baseUrl}/api/Producto/GetProductosMercanciaByIdCategoria/${idCategoria}`);
  }

  getProductoMercanciaById(idProductoMercancia: number): Observable<ProductoMercanciaModel> {
    return this.http.get<ProductoMercanciaModel>(`${this.baseUrl}/api/Producto/GetProductoMercanciaById/${idProductoMercancia}`);
  }

  getProductoMercanciaDetalleByIdProducto(idProducto: number): Observable<ProductoMercanciaDetalleModel> {
    return this.http.get<ProductoMercanciaDetalleModel>(`${this.baseUrl}/api/Producto/GetProductoMercanciaDetalleByIdProducto/${idProducto}`);
  }

  getListadoParametrizacionProducto(): Observable<ListasParametrizacionProducto> {
    return this.http.get<ListasParametrizacionProducto>(`${this.baseUrl}/api/Producto/GetListasParametrizacionProducto`);
  }

  crearProductoMercancia(productoMercanciaModel: ProductoMercanciaModel): Observable<number> {
    productoMercanciaModel.idUsuario = this.helper.decodeToken(this.token).nameid;
    return this.http.post<number>(`${this.baseUrl}/api/Producto/CrearProductoMercancia`, productoMercanciaModel).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }

  actualizarProductoMercancia(productoMercanciaModel: ProductoMercanciaModel): Observable<number> {
    productoMercanciaModel.idUsuario = this.helper.decodeToken(this.token).nameid;
    return this.http.post<number>(`${this.baseUrl}/api/Producto/ActualizarProductoMercancia`, productoMercanciaModel).pipe(
      catchError(err => {
        throw err;
      })
    );;
  }
}
