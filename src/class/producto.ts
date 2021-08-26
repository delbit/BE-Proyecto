export default class Producto {
  id;
  timestamp;
  nombre;
  descripcion;
  precio;
  codigo;
  url;
  stock;

  constructor(
    id: number,
    timestamp: Date,
    nombre: string,
    descripcion: string,
    precio: number,
    codigo: number,
    url: string,
    stock: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.codigo = codigo;
    this.url = url;
    this.stock = stock;
  }

  modificar(
    id: number,
    timestamp: Date,
    nombre: string,
    descripcion: string,
    precio: number,
    codigo: number,
    url: string,
    stock: number
  ) {
    this.timestamp = timestamp;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.codigo = codigo;
    this.url = url;
    this.stock = stock;
  }
}
