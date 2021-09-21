import {
  newProductI,
  addProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';

export class ProductosMemDAO implements ProductBaseClass {
  private productos: ProductI[] = [];

  constructor() {
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

    mockData.forEach((aMock) => this.productos.push(aMock));
  }

  findIndex(id: string) {
    return this.productos.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): ProductI | undefined {
    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: addProductI): Promise<ProductI> {
    //if (!data.nombre || !data.precio) throw new Error('invalid data');
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

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.productos.splice(index, 1);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct: ProductI) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
