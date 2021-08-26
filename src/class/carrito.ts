import Producto from './producto';
export default class Carrito {
  id;
  timestamp;
  producto: Producto[];

  constructor(id: number, timestamp: Date) {
    this.id = id;
    this.timestamp = timestamp;
    this.producto = [];
  }
}
