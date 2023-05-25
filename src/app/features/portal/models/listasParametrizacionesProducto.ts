import { CategoryModel } from "./category.model";
import { ColorModel } from "./color.model";
import { GeneroModel } from "./genero.model";
import { TallaModel } from "./talla.model";

export class ListasParametrizacionProducto {
  listCategoria!: CategoryModel[];
  listTalla!: TallaModel[];
  listGenero!: GeneroModel[];
  listColor!: ColorModel[];
}
