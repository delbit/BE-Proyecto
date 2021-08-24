import Producto from './producto';
export default class Carrito {
  id;
  timestamp;
  producto: any;

  constructor(id: number, timestamp: Date, producto: Producto) {
    this.id = id;
    this.timestamp = timestamp;
    this.producto.push(producto);
  }
}
