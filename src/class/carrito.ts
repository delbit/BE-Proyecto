import Producto from './producto';

export default class Carrito {
  id;
  timestamp;
  productos: Producto[];

  constructor(id: number, timestamp: Date) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = [];
  }
  addProducto(producto: Producto) {
    this.productos.push(producto);
  }

  delProducto(indexID: number) {
    this.productos.splice(indexID, 1);
  }
}
