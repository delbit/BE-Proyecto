import { carritoGlobal } from './data';
import { productos, dbIDs, lastID } from './data';
import Producto from '../class/producto';

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
    return carritoGlobal;
  }
  //   let dataOk: boolean = checkParams(data);

  //   if (dataOk) {
  //     lastID.lastID = lastID.lastID + 1; // Se incrementa el lastID.lastID por que se va a guarda un nuevo valor.
  //     const objProducto = new Producto(
  //       lastID.lastID,
  //       new Date(),
  //       data.nombre,
  //       data.descripcion,
  //       parseFloat(data.precio),
  //       parseInt(data.codigo),
  //       data.url,
  //       parseInt(data.stock)
  //     );
  //     productos.push(objProducto);
  //     dbIDs.push(lastID.lastID);

  //     return objProducto;
  //   } else {
  //     return dataOk;
  //   }
  // }

  // del(indexID: number) {
  //   const producto = productos[indexID];
  //   productos.splice(indexID, 1);
  //   dbIDs.splice(indexID, 1);
  //   return producto;
  // }
}

export const carritoPersistencia = new Carrito();
