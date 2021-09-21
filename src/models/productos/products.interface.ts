export interface newProductI {
  timestamp?: Date;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  codigo?: string;
  url?: string;
  stock?: number;
}
export interface addProductI {
  nombre: string;
  descripcion: string;
  precio: number;
  codigo: string;
  url: string;
  stock: number;
}

export interface ProductI {
  _id: string;
  timestamp: Date;
  nombre: string;
  descripcion: string;
  precio: number;
  codigo: string;
  url: string;
  stock: number;
}

export interface ProductQuery {
  nombre?: string;
  precio?: number;
  precioMin?: number;
  precioMx?: number;
  stockMin?: number;
  stockMx?: number;
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductI[]>;
  add(data: newProductI): Promise<ProductI>;
  update(id: string, newProductData: newProductI): Promise<ProductI>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductI[]>;
}
