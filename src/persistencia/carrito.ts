import { carritoGlobal } from './data';
import { productos, dbIDs, lastID } from './data';
const fs = require('fs');
import path from 'path';
import { objToJSON } from './../modules/app';
const publicPathFileCarrito = path.resolve(
  __dirname,
  './../../public/carrito.json'
);

class Carrito {
  //Se encarga de buscar un producto en particular y lo retorno si existe
  find(id: number) {
    let indexID = -1;

    for (let i = 0; i < carritoGlobal.productos.length; i++) {
      if (carritoGlobal.productos[i].id === id) {
        indexID = i;
      }
    }

    return indexID;
  }

  //Retorna la lista de productos
  get(indexID: number = 0) {
    if (indexID !== 0) {
      let obj = {
        id: carritoGlobal.id,
        timestamp: carritoGlobal.timestamp,
        productos: [carritoGlobal.productos[indexID]],
      };
      return obj;
    }

    return carritoGlobal;
  }

  post(indexID: number) {
    carritoGlobal.addProducto(productos[indexID]);
    this.guardarCarrito();
    return carritoGlobal;
  }

  del(indexID: number) {
    carritoGlobal.delProducto(indexID);
    this.guardarCarrito();
    return carritoGlobal;
  }

  guardarCarrito() {
    fs.writeFileSync(publicPathFileCarrito, objToJSON(carritoGlobal), 'utf-8');
  }
}

export const carritoPersistencia = new Carrito();
