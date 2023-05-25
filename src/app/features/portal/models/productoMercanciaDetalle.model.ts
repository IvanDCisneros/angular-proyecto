import { ColorModel } from "./color.model";
import { GeneroModel } from "./genero.model";
import { ProductoMercanciaModel } from "./productoMercancia.model";
import { TallaModel } from "./talla.model";

export class ProductoMercanciaDetalleModel {
  listProductoMercancia!: ProductoMercanciaModel[];
  listTalla!: TallaModel[];
  listGenero!: GeneroModel[];
  listColor!: ColorModel[];
}
