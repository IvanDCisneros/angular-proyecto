import { ItemFacturaModel } from "./itemFactura.model";

export class FacturaModel {
  idFactura!: number;
  numeroFactura!: number;
  descripcion!: string; 
  identificacionCliente!: number;
  nombreCliente!: string;
  correoElectronico!: string;
  telefono!: number;
  direccion!: string;
  ciudad!: string;
  departamento!: string;
  nombreEstadoFactura!: string;
  valorTotal!: number;
  fecha!: Date;
  listItemsFacturas!: ItemFacturaModel[];
}
