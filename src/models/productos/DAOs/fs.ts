import fs from 'fs';
import {
  newProductI,
  ProductI,
  addProductI,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';

export class ProductosFSDAO implements ProductBaseClass {
  private productos: ProductI[] = [];
  private nombreArchivo: string;

  constructor(fileName: string) {
    const mockData = [
      {
        _id: '1',
        timestamp: new Date(),
        nombre: 'lapiz',
        descripcion: 'punta fina',
        precio: 200,
        codigo: 'P899',
        url: 'www.url',
        stock: 15,
      },

      {
        _id: '2',
        timestamp: new Date(),
        nombre: 'lapiz',
        descripcion: 'punta fina',
        precio: 200,
        codigo: 'P899',
        url: 'www.url',
        stock: 15,
      },

      {
        _id: '3',
        timestamp: new Date(),
        nombre: 'lapiz',
        descripcion: 'punta fina',
        precio: 200,
        codigo: 'P899',
        url: 'www.url',
        stock: 15,
      },
    ];
    this.nombreArchivo = fileName;
    this.productos = mockData;
    this.guardar();
  }

  async leer(archivo: string): Promise<void> {
    this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar(): Promise<void> {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, '\t')
    );
  }

  async findIndex(id: string): Promise<number> {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct: ProductI) => aProduct._id == id);
  }

  async find(id: string): Promise<ProductI | undefined> {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: addProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    await this.leer(this.nombreArchivo);
    let lastP = this.productos.length - 1;
    let lastID = Number(this.productos[lastP]._id);
    const newItem: ProductI = {
      _id: (lastID + 1).toString(),
      timestamp: new Date(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      codigo: data.codigo,
      url: data.url,
      stock: data.stock,
    };

    this.productos.push(newItem);

    await this.guardar();

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct: ProductI) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
