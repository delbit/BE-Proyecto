import { productos, dbIDs, lastID } from './data';

// interface addProduct {
//   nombre: string,
//   precio: number
// }

// interface Product {
//   id: number,
//   nombre: string,
//   precio: number
// }

class Productos {
  //Se encarga de buscar un producto en particular y lo retorno si existe
  find(id: number) {
    if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
      return false;
    }

    const indexID = dbIDs.findIndex((ID) => ID === id);
    if (indexID === -1) {
      return false;
    }

    return productos[id];
  }

  //Retorna la lista de productos
  get() {
    return productos;
  }

  // add(data: addProduct){

  //   const newItem = {
  //     id: productos.length +1,
  //     nombre : data.nombre,
  //     precio : data.precio,
  //   }

  //   productos.push(newItem);

  //   return newItem;
  // }

  // update(id, data){

  // }

  // delete(id: number) {
  //   productos = productos.filter((aProduct) => aProduct.id !== Number(id));
  //   return productos;
  // }
}

export const productsPersistencia = new Productos();
