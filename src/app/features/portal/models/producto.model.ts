export class ProductoModel {
  idProducto: number = 0;
  nombre: string = '';
  descripcion: string = '';
  idCategoria: number = 0;
  nombreCategoria: string = '';
  rutaImagen!: string;
  estaActivo: boolean = true;
}
