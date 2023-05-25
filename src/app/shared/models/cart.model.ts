export class CartItemModel {
  idProductoMercancia!: number;
  nombreProducto!: string;
  nombreGenero!: string;
  nombreTalla!: string;
  nombreColor!: string;
  existenciasBodega!: number;
  valorVenta!: number;
  cantidad!: number;
  subTotal: number = 0;
}
